import { DetalleVenta } from './../../models/detalleVenta';
import { Producto } from './../../models/producto';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ProductoService } from './../../services/producto.service';
import { VentaService } from './../../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  form: FormGroup;
  listaProductos:Producto[]=[];
  productoSeleccionado: Producto = new Producto;
  listadetalleVenta:DetalleVenta[]=[];
  detalleventa!: DetalleVenta;
  totalVenta=0;


  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
    private toastr: ToastrService,private VentaService: VentaService, private ProductoService: ProductoService,
    private PaginacionService: PaginacionService) {
      this.form = this.fb.group({
        buscadorProducto: new FormControl(''),
        cantidad : new FormControl(1),
        nombreCliente: new FormControl(''),
        total : new FormControl(0),
      })
    }

  ngOnInit( ): void {
  }


  obtenerProductos()
  {
    this.PaginacionService.Filtro.filter=this.form.value.buscadorProducto;
    this.PaginacionService.Filtro.PageSize=100000;
    this.PaginacionService.Filtro.PageNumber=1;

    this.ProductoService.gets().subscribe( r =>
      {
        this.listaProductos=r.data;
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
    if(this.productoSeleccionado.precioVenta)
    {
    this.detalleventa={
      cantidad: this.form.value.cantidad,
      idProducto:this.productoSeleccionado.id,
      subTotal: this.productoSeleccionado.precioVenta*this.form.value.cantidad,
      producto: this.productoSeleccionado.codigo+" "+ this.productoSeleccionado.descripcion+" "+ this.productoSeleccionado.color,
      precioVenta: this.productoSeleccionado.precioVenta
     }
     this.totalVenta= this.totalVenta +this.productoSeleccionado.precioVenta*this.form.value.cantidad;
    }
    this.listadetalleVenta.push(this.detalleventa);
  }


  guardar()
  {
    this.form.value.total=this.totalVenta;
    console.log(this.form.value)




  }



}
