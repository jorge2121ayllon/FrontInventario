import { PaginacionService } from 'src/app/services/paginacion.service';
import { DetalleCompraService } from './../../../services/detalle-compra.service';
import { CompraService } from './../../../services/compra.service';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraCompraDetalle } from './../../../models/compraCompraDetalle';
import { DetalleCompra } from './../../../models/detalleCompra';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { VentaVentaDetalle } from './../../../models/VentaVentaDetalle';
import { DetalleVenta } from './../../../models/detalleVenta';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-compraedit',
  templateUrl: './compraedit.component.html',
  styleUrls: ['./compraedit.component.css']
})
export class CompraeditComponent implements OnInit {

  form: FormGroup;

  listaProductos:Producto[]=[];
  listaProductosAux:Producto[]=[];

  productoSeleccionado: Producto = new Producto;
  detalleCompra!: DetalleCompra;
  compra: CompraCompraDetalle = new CompraCompraDetalle;
  totalCompra=0;

  listadetalleCompra:DetalleCompra[]=[];
  listadetalleCompraAux:DetalleCompra[]=[];

  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
    private toastr: ToastrService,private CompraService: CompraService, private ProductoService: ProductoService,
    private PaginacionService: PaginacionService,private DetalleCompraService: DetalleCompraService)
    {
      this.form = this.fb.group({
        buscadorProducto: new FormControl(''),
        cantidad : new FormControl(1),
        total : new FormControl(0),
        Id: new FormControl(this.Route.snapshot.params.id)
      })
     }

  ngOnInit(): void {
    this.ObtenerCompra();

  }

  ObtenerCompra(){
    this.CompraService.getCompra(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.form.controls['total'].setValue(r.data.total)
        this.totalCompra = this.form.value.total;
      }
    )
    this.DetalleCompraService.getDetallesCompra(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.listadetalleCompraAux=r.data;
        this.listadetalleCompraAux.forEach(element => {

              if(element.idProducto)
              {
                this.ProductoService.get(element.idProducto).subscribe( r =>
                  {
                    this.productoSeleccionado = r.data;
                    this.detalleCompra={
                    id: element.id,
                    idCompra: this.Route.snapshot.params.id,
                    cantidad: element.cantidad,
                    idProducto:this.productoSeleccionado.id,
                    subTotal: element.subTotal,
                    producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+  this.productoSeleccionado.color,
                    precioCompra: this.productoSeleccionado.precioCompra
                   }
                   this.listaProductosAux.push(this.productoSeleccionado);
                   this.listadetalleCompra.push(this.detalleCompra);
                   this.productoSeleccionado=new Producto;
                  }
                )

              }
        });
      }
    )
    console.log('error')
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
     if(this.productoSeleccionado.precioVenta && unicoProducto.length<1 && this.productoSeleccionado.stock)
     {
         this.detalleCompra={
           cantidad: this.form.value.cantidad,
           idProducto:this.productoSeleccionado.id,
           subTotal: this.productoSeleccionado.precioVenta*this.form.value.cantidad,
           producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
           precioCompra: this.productoSeleccionado.precioCompra
          }
          this.totalCompra= this.totalCompra +this.productoSeleccionado.precioVenta*this.form.value.cantidad;
          this.listadetalleCompra.push(this.detalleCompra);
          this.productoSeleccionado=new Producto;
     }
     else{
       this.toastr.warning("Este producto ya fue agregado anteriormente al detalle de la venta")
       this.productoSeleccionado=new Producto;
     }
   }


  eliminarDetalle(detalle: DetalleVenta)
  {
    if(detalle.subTotal! && detalle.id!)
    {
      this.totalCompra=this.totalCompra-detalle.subTotal;

      this.DetalleCompraService.deleteDetalleCompra(detalle.id).subscribe((data) => {
        this.listadetalleCompra=this.listadetalleCompra.filter((item) => item.id != detalle.id);
      });
    }
  }

  guardar()
  {
    this.form.value.total=this.totalCompra;
    this.compra.detalleCompra=this.listadetalleCompra;
    this.compra.Compra=this.form.value;

    this.CompraService.updateCompra(this.compra).subscribe
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
}
