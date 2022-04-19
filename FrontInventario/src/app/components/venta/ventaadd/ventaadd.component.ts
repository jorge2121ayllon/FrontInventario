import { VentaVentaDetalle } from './../../../models/VentaVentaDetalle';
import { Observable } from 'rxjs';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ProductoService } from './../../../services/producto.service';
import { Producto } from './../../../models/producto';
import { DetalleVenta } from './../../../models/detalleVenta';
import { VentaService } from './../../../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-ventaadd',
  templateUrl: './ventaadd.component.html',
  styleUrls: ['./ventaadd.component.css']
})
export class VentaaddComponent implements OnInit {

  load: boolean= true;
  form: FormGroup;
  listaProductos:Producto[]=[];
  productoSeleccionado: Producto = new Producto;
  listadetalleVenta:DetalleVenta[]=[];
  detalleventa!: DetalleVenta;
  venta: VentaVentaDetalle = new VentaVentaDetalle;
  totalVenta=0;
  listaProductosAux:Producto[]=[];
  //img


  envairomentGloblal= environment.appUrl;
  numeroLista=1;

  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
              private toastr: ToastrService,private VentaService: VentaService, private ProductoService: ProductoService,
              private PaginacionService: PaginacionService,)
              {
                this.form = this.fb.group({
                  buscadorProducto: new FormControl(''),
                  cantidad : new FormControl(1),
                  nombreCliente: new FormControl(''),
                  total : new FormControl(0),
                  celular: new FormControl('',Validators.required),
                })
              }

  ngOnInit(): void {

  }

  obtenerProductos()
  {
    this.load= false;
    this.PaginacionService.Filtro.filter=this.form.value.buscadorProducto;
    this.PaginacionService.Filtro.PageSize=100000;
    this.PaginacionService.Filtro.PageNumber=1;

    this.ProductoService.gets().subscribe( r =>
      {
        this.load= true;
        this.listaProductos=r.data;
        this.listaProductosAux=r.data;
      }, error => {
        this.load=true;
        this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
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
    let unicoProducto = this.listadetalleVenta.filter(prodcuto=>prodcuto.idProducto==this.productoSeleccionado.id);
    if(this.productoSeleccionado.precioVenta && unicoProducto.length<1 && this.productoSeleccionado.stock)
    {
      if(this.productoSeleccionado.stock>=this.form.value.cantidad){
        this.detalleventa={
          cantidad: this.form.value.cantidad,
          idProducto:this.productoSeleccionado.id,
          subTotal: this.productoSeleccionado.precioVenta*this.form.value.cantidad,
          producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
          precioVenta: this.productoSeleccionado.precioVenta
         }
         this.totalVenta= this.totalVenta +this.productoSeleccionado.precioVenta*this.form.value.cantidad;

         this.listadetalleVenta.push(this.detalleventa);

         this.productoSeleccionado=new Producto;
      }
      else{

        this.toastr.warning("El producto no cuenta con el suficiente stock para la venta")
      }

    }
    else{
      this.toastr.warning("Este producto ya fue agregado anteriormente al detalle de la venta")
      this.productoSeleccionado=new Producto;
    }
  }

  guardar()
  {
    this.load= false;
    if (this.form.valid)
    {
      this.form.value.total=this.totalVenta;

      this.venta.detalleVenta=this.listadetalleVenta;
      this.venta.venta=this.form.value;

      this.VentaService.saveVenta(this.venta).subscribe
      (
        r=> {
          this.load=true;
          this.Router.navigate(['/ventas']);
          this.toastr.success("se guardo exitosamente","Guardado.")
        },
        error => {
          this.load=true;
          this.toastr.warning("no se guardo, revise su conexión","Error.")
        }
      )
    }
  }


  eliminarDetalle(detalle: DetalleVenta)
  {
    if(detalle.subTotal!)
    {
    this.totalVenta=this.totalVenta-detalle.subTotal;
    this.listadetalleVenta=this.listadetalleVenta.filter((item) => item.idProducto != detalle.idProducto);
    }
  }

  editarDetalle(detalleSeleccionado : DetalleVenta)
  {
    this.eliminarDetalle(detalleSeleccionado);
    this.productoSeleccionado= (this.listaProductosAux.filter(listaProductosAux=>listaProductosAux.id==detalleSeleccionado.idProducto))[0];
    console.log(this.productoSeleccionado)
  }



}
