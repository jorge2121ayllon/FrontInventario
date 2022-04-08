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

@Component({
  selector: 'app-ventaedit',
  templateUrl: './ventaedit.component.html',
  styleUrls: ['./ventaedit.component.css']
})
export class VentaeditComponent implements OnInit {

  form: FormGroup;

  listaProductos:Producto[]=[];
  listaProductosAux:Producto[]=[];

  productoSeleccionado: Producto = new Producto;
  detalleventa!: DetalleVenta;
  venta: VentaVentaDetalle = new VentaVentaDetalle;
  totalVenta=0;

  listadetalleVenta:DetalleVenta[]=[];
  listadetalleVentaAux:DetalleVenta[]=[];

 //img
 listaImg :Producto[]=[];
 myimage: any;




  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
    private toastr: ToastrService,private VentaService: VentaService, private ProductoService: ProductoService,
    private PaginacionService: PaginacionService,private DetalleVentaService: DetalleVentaService)
    {
      this.form = this.fb.group({
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
    this.VentaService.getVenta(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.form.controls['total'].setValue(r.data.total)
        this.form.controls['nombreCliente'].setValue(r.data.nombreCliente)
        this.form.controls['celular'].setValue(r.data.celular)
        this.totalVenta = this.form.value.total;
      }
    )
    this.DetalleVentaService.getDetallesVenta(this.Route.snapshot.params.id).subscribe(
      r=>{
        this.listadetalleVentaAux=r.data;
        this.listadetalleVentaAux.forEach(element => {

              if(element.idProducto)
              {
                this.ProductoService.get(element.idProducto).subscribe( r =>
                  {

                    this.productoSeleccionado = r.data;
                    this.detalleventa={
                    id: element.id,
                    idVenta: this.Route.snapshot.params.id,
                    cantidad: element.cantidad,
                    idProducto:this.productoSeleccionado.id,
                    subTotal: element.subTotal,
                    producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+  this.productoSeleccionado.color,
                    precioVenta: this.productoSeleccionado.precioVenta
                   }
                   this.listaProductosAux.push(this.productoSeleccionado);
                   this.listadetalleVenta.push(this.detalleventa);
                   this.productoSeleccionado=new Producto;
                  }

                )

              }
        });
      }
    )
  }

  obtenerProductos()
  {
    this.PaginacionService.Filtro.filter=this.form.value.buscadorProducto;
    this.PaginacionService.Filtro.PageSize=100000;
    this.PaginacionService.Filtro.PageNumber=1;

    this.ProductoService.gets().subscribe( r =>
      {
        this.listaProductos=r.data;
        //img
        this.listaImg=this.listaProductos;
        this.listaImgs(this.listaImg);
        //
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
     let unicoProducto = this.listadetalleVenta.filter(prodcuto=>prodcuto.idProducto==this.productoSeleccionado.id);
     if(this.productoSeleccionado.precioVenta && unicoProducto.length<1 && this.productoSeleccionado.stock)
     {
       if(this.productoSeleccionado.stock>= this.form.value.cantidad){
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


  eliminarDetalle(detalle: DetalleVenta)
  {
    if(detalle.subTotal! && detalle.id!)
    {
      this.totalVenta=this.totalVenta-detalle.subTotal;

      this.DetalleVentaService.deleteDetalleVenta(detalle.id).subscribe((data) => {
        this.listadetalleVenta=this.listadetalleVenta.filter((item) => item.id != detalle.id);
      });
    }
  }

  guardar()
  {
    if (this.form.valid)
    {
    this.form.value.total=this.totalVenta;
    this.venta.detalleVenta=this.listadetalleVenta;
    this.venta.venta=this.form.value;

    this.VentaService.updateVenta(this.venta).subscribe
    (
      r=> {
        this.Router.navigate(['/ventas']);
        this.toastr.success("se guardo exitosamente","Guardado.")
      },
      error => {
        this.toastr.warning("no se guardo","Error.")
      }
    )
  }
}



//metodo para retornar la img de cada producto
returnImg(id:any){
  for (let index = 0; index < this.listaImg.length; index++) {
    if (this.listaImg[index].id===id) {
      this.myimage=this.listaImg[index].imagen;
    }
  }
return this.myimage;
}

 //base 64 to image
 async toImage(url: any){
  if(url===""){
    return '/assets/img/productoSinImagen.jpg'
  }
  var res =  await fetch(url);
  var blob =  (await res).blob();

  const result =  new Promise(async (resolve, reject) => {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(await blob);
  })
  return result
};
//almacena los productos en una lista local para convertir las img
listaImgs(lista:any){
  for (let index = 0; index < lista.length; index++) {
          lista[index].imagen= this.toImage(lista[index].imagen)
  }
}
}
