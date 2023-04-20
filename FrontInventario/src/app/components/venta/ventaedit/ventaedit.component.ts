import { DetalleVentaService } from './../../../services/detalle-venta.service';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { VentaVentaDetalle } from './../../../models/VentaVentaDetalle';
import { DetalleVenta } from './../../../models/detalleVenta';
import { Producto } from './../../../models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from './../../../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { DetalleVentaImg } from 'src/app/models/detalleVentaImg';


@Component({
  selector: 'app-ventaedit',
  templateUrl: './ventaedit.component.html',
  styleUrls: ['./ventaedit.component.css']
})
export class VentaeditComponent implements OnInit {

  load: boolean= true;
  form: FormGroup;

  listaProductos:Producto[]=[];
  listaProductosAux:Producto[]=[];

  productoSeleccionado: Producto = new Producto;
  detalleventa!: DetalleVenta;
  //modificacion
  listadetalleVentaImg: DetalleVentaImg[]=[];
  //
  //modificacion
  detalleventaImg!: DetalleVentaImg;
  //
  venta: VentaVentaDetalle = new VentaVentaDetalle;
  totalVenta=0;

  listadetalleVenta:DetalleVenta[]=[];
  listadetalleVentaAux:DetalleVenta[]=[];

  envairomentGloblal= environment.appUrl;

 myimage: any;




  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
    private toastr: ToastrService,private VentaService: VentaService, private ProductoService: ProductoService,
    private PaginacionService: PaginacionService,private DetalleVentaService: DetalleVentaService)
    {
      this.form = this.fb.group({
        descuento : new FormControl(0),
        buscadorProducto: new FormControl(''),
        cantidad : new FormControl(1),
        nombreCliente: new FormControl(''),
        total : new FormControl(0),
        Id: new FormControl(this.Route.snapshot.params.id),
        celular: new FormControl('',Validators.required),
      })
    }

  ngOnInit(): void {
    this.ObtenerVenta();
  }


  ObtenerVenta(){
    this.load= false;
    this.VentaService.getVenta(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.load= true;
        this.form.controls['total'].setValue(r.data.total)
        this.form.controls['nombreCliente'].setValue(r.data.nombreCliente)
        this.form.controls['celular'].setValue(r.data.celular)
        this.totalVenta = this.form.value.total;
      }, error => {
        this.load=true;
        this.toastr.warning("No se pudo Obtener la Venta, Por favor verifique su conexión a Internet","Error.")
      }
    )
    this.load= false;
    this.DetalleVentaService.getDetallesVenta(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.load= true;
        console.log(r.data)

        this.listadetalleVentaAux=r.data;
        this.listadetalleVentaAux.forEach(element => {

              if(element.idProducto)
              {
                this.load= false;
                this.ProductoService.get(element.idProducto).subscribe( r =>
                  {
                    this.load= true;
                    this.productoSeleccionado = r.data;
                    this.detalleventa={
                    descuento : element.descuento,
                    id: element.id,
                    idVenta: this.Route.snapshot.params.id,
                    cantidad: element.cantidad,
                    idProducto:this.productoSeleccionado.id,
                    subTotal: element.subTotal,
                    producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+  this.productoSeleccionado.color,
                    precioVenta: this.productoSeleccionado.precioVenta
                   }
                   //modificacion img en detalle
                   this.detalleventaImg={
                    descuento : element.descuento,
                    id: element.id,
                    idVenta: this.Route.snapshot.params.id,
                    cantidad: element.cantidad,
                    idProducto:this.productoSeleccionado.id,
                    subTotal: element.subTotal,
                    producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+  this.productoSeleccionado.color,
                    precioVenta: this.productoSeleccionado.precioVenta,
                    imagen:this.productoSeleccionado.imagen
                   }
                   //
                   this.listaProductosAux.push(this.productoSeleccionado);
                   this.listadetalleVenta.push(this.detalleventa);
                   //modificacion img en detalle
                   this.listadetalleVentaImg.push(this.detalleventaImg);
                   //
                   this.productoSeleccionado=new Producto;
                  }, error => {
                    this.load=true;
                    this.toastr.warning("No se pudo obtener el Producto, Por favor verifique su conexión a Internet","Error.")
                  }

                )

              }
        });
      }, error => {
        this.load=true;
        this.toastr.warning("No se pudo obtener el detalle de venta, Por favor verifique su conexión a Internet","Error.")
      }
    )
    this.load= true;
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
        //img

        //
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
       if(this.productoSeleccionado.stock>= this.form.value.cantidad){
         this.detalleventa={
          descuento: this.form.value.descuento,
           cantidad: this.form.value.cantidad,
           idProducto:this.productoSeleccionado.id,
           subTotal: (this.productoSeleccionado.precioVenta*this.form.value.cantidad)- this.form.value.descuento,
           producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
           precioVenta: this.productoSeleccionado.precioVenta
          }
          //modificacion img en detalle
          this.detalleventaImg={
            descuento: this.form.value.descuento,
            cantidad: this.form.value.cantidad,
            idProducto:this.productoSeleccionado.id,
            subTotal: (this.productoSeleccionado.precioVenta*this.form.value.cantidad)- this.form.value.descuento,
            producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
            precioVenta: this.productoSeleccionado.precioVenta,
            imagen:this.productoSeleccionado.imagen
           }
           //
           this.totalVenta= this.totalVenta +this.productoSeleccionado.precioVenta*this.form.value.cantidad -this.form.value.descuento;

          this.listadetalleVenta.push(this.detalleventa);
          //modificacion img en detalle
          this.listadetalleVentaImg.push(this.detalleventaImg);
          //
          this.productoSeleccionado=new Producto;
          this.form.controls.descuento.setValue(0);

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


  eliminarDetalle(detalle: DetalleVenta)
  {
    if(detalle.subTotal! && detalle.id!)
    {
      this.load= false;
      this.totalVenta=this.totalVenta-detalle.subTotal;

      this.DetalleVentaService.deleteDetalleVenta(detalle.id).subscribe((data) => {
        this.load= true;
        this.listadetalleVenta=this.listadetalleVenta.filter((item) => item.id != detalle.id);
        //modificacion img en detalle
        this.listadetalleVentaImg=this.listadetalleVentaImg.filter((item) => item.id != detalle.id);
        //
      }, error => {
        this.load=true;
        this.toastr.warning("no sep udo eliminar, Por favor verifique su conexión a Internet","Error.")
      });
    }
  }

  guardar()
  {
    if (this.form.valid)
    {
      this.load= false;
    this.form.value.total=this.totalVenta;
    this.venta.detalleVenta=this.listadetalleVenta;
    this.venta.venta=this.form.value;

    this.VentaService.updateVenta(this.venta).subscribe
    (
      r=> {
        this.load= true;
        this.Router.navigate(['/ventas']);
        this.toastr.success("se guardo exitosamente","Guardado.")
      }, error => {
        this.load=true;
        this.toastr.warning("no se guardo, Por favor verifique su conexión a Internet","Error.")
      }
    )
  }
}



}
