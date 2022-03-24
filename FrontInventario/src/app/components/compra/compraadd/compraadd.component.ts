import { CompraService } from './../../../services/compra.service';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraCompraDetalle } from './../../../models/compraCompraDetalle';
import { DetalleCompra } from './../../../models/detalleCompra';
import { Producto } from './../../../models/producto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compraadd',
  templateUrl: './compraadd.component.html',
  styleUrls: ['./compraadd.component.css']
})
export class CompraaddComponent implements OnInit {

  form: FormGroup;

  listaProductos:Producto[]=[];
  listadetalleCompra:DetalleCompra[]=[];
  listaProductosAux:Producto[]=[];

  compra: CompraCompraDetalle = new CompraCompraDetalle;
  productoSeleccionado: Producto = new Producto;
  detalleCompra!: DetalleCompra;
  totalCompra=0;


  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
    private toastr: ToastrService,private CompraService: CompraService, private ProductoService: ProductoService,
    private PaginacionService: PaginacionService) {
      this.form = this.fb.group({
        buscadorProducto: new FormControl(''),
        cantidad : new FormControl(1),
        total : new FormControl(0),
      })
     }

  ngOnInit(): void {
  }



  obtenerProductos()
  {
    this.PaginacionService.Filtro.filter=this.form.value.buscadorProducto;
    this.PaginacionService.Filtro.PageSize=100000;
    this.PaginacionService.Filtro.PageNumber=1;

    this.ProductoService.gets().subscribe( r =>
      {
        this.listaProductos=r.data;
        this.listaProductosAux=r.data;
      }
    )
  }


  seleccionProducto(producto : any){
    this.listaProductos= this.listaProductos.filter(listaProductos=>listaProductos.id==producto.id);
    this.productoSeleccionado= this.listaProductos[0];
    this.listaProductos=[];
  }

  agregarDetalle()
  {
    let unicoProducto = this.listadetalleCompra.filter(prodcuto=>prodcuto.idProducto==this.productoSeleccionado.id);

    if(this.productoSeleccionado.precioCompra && unicoProducto.length<1 && this.productoSeleccionado.stock)
    {
        this.detalleCompra={
          cantidad: this.form.value.cantidad,
          idProducto:this.productoSeleccionado.id,
          subTotal: this.productoSeleccionado.precioCompra*this.form.value.cantidad,
          producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
          precioCompra: this.productoSeleccionado.precioCompra
         }
         this.totalCompra= this.totalCompra +this.productoSeleccionado.precioCompra*this.form.value.cantidad;

         this.listadetalleCompra.push(this.detalleCompra);

         this.productoSeleccionado=new Producto;
    }
    else{
      this.toastr.warning("Este producto ya fue agregado anteriormente al detalle de la venta")
      this.productoSeleccionado=new Producto;
    }
  }

  guardar()
  {
    this.form.value.total=this.totalCompra;

    this.compra.detalleCompra=this.listadetalleCompra;
    this.compra.Compra=this.form.value;

    this.CompraService.saveCompra(this.compra).subscribe
    (
      r=> {
        this.Router.navigate(['/compras']);
        this.toastr.success("se guardo exitosamente","Guardado.")
      },
      error => {
        this.toastr.warning("no se guardo","Error.")
      }
    )
  }


  eliminarDetalle(detalle: DetalleCompra)
  {
    if(detalle.subTotal!)
    {
    this.totalCompra=this.totalCompra-detalle.subTotal;
    this.listadetalleCompra=this.listadetalleCompra.filter((item) => item.idProducto != detalle.idProducto);
    }
  }

  editarDetalle(detalleSeleccionado : DetalleCompra)
  {
    this.eliminarDetalle(detalleSeleccionado);
    this.productoSeleccionado= (this.listaProductosAux.filter(listaProductosAux=>listaProductosAux.id==detalleSeleccionado.idProducto))[0];
  }
}

