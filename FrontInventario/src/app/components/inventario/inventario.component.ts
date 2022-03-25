import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductoService } from './../../services/producto.service';
import { VentaService } from './../../services/venta.service';
import { DetalleVenta } from './../../models/detalleVenta';
import { DetalleVentaService } from './../../services/detalle-venta.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  form: FormGroup;
  formFechaInicio: any;
  formFechaFin: any;
  formCantidadTotal;
  formGananciaTotal;
  displayedColumns: string[] = ['idCategoria', 'marca', 'descripcion', 'precioCompra', 'precioVenta', 'stock', 'ganancia'];
  productos :any;
  metadata :any;
  listaDetalles : DetalleVenta[]=[];
  listaProductos: any;
  detalles: any;
  ventas: any;
  lista: any;
  detalleProductos: Producto[]=[];

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;

  constructor(private ProductoService : ProductoService, private VentaService : VentaService, private DetalleVentaService: DetalleVentaService, private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl, private toastr: ToastrService, private formBuilder: FormBuilder,) { 
      this.paginator.itemsPerPageLabel = "Registros por página";

      this.formFechaInicio = 'fechaInicio';
      this.formFechaFin = 'fechaFin';
      this.formCantidadTotal = 'cantidadTotal';
      this.formGananciaTotal = 'gananciaTotal';

      this.form = this.formBuilder.group({
          fechaInicio: ['', [Validators.required]],
          fechaFin: ['', [Validators.required]],
          cantidadTotal: [''],
          gananciaTotal: [''],
        }
      )
    }

 ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;

    this.PaginacionService.FiltroDate.dateInit=new Date();
    this.PaginacionService.FiltroDate.dateEnd=new Date();
    this.PaginacionService.FiltroDate.PageSize=5;
    this.PaginacionService.FiltroDate.PageNumber=1;
    this.DetalleVentas();
    this.Productos();
  }
  
  //Obtiene ventas de determinada fecha
  VerLista(){
    var fInit = this.form.value.fechaInicio;
    var fEnd = this.form.value.fechaFin;
    this.PaginacionService.FiltroDate.dateInit=fInit;
    this.PaginacionService.FiltroDate.dateEnd=fEnd;
    this.Ventas();
  }

  //Obtener gananacia total de productos vendidos
  GananciaTotal(lista: any){
    var contador=0;
    for(let i=0; i<lista.length; i++){
      contador+=(lista[i].precioVenta-lista[i].precioCompra)*lista[i].stock;
    }
    console.log(contador);
    return contador;
  }

  //Obtiene detalles de venta de una venta en concreto
  BuscarDetalles(lista: any){
    var contador = 0;
    for(let i=0; i<lista.length; i++){
      for(let j=0; j<this.detalles.length; j++){
        if(lista[i].id === this.detalles[j].idVenta){
          this.listaDetalles[contador] = this.detalles[j];
          contador++;
        }
      }
    }
    return this.listaDetalles;
  }

  //Obtiene cantidad de productos vendidos por producto
  BuscarDetalleProductos(lista: any){
    var contador=0;
    for(let i=0; i<lista.length; i++){
      for(let j=0; j<this.productos.length; j++){
        if(lista[i].idProducto === this.productos[j].id){
          if(!this.detalleProductos.length){
            console.log("m");
            this.detalleProductos[contador] = this.productos[j];
            this.detalleProductos[contador].stock = lista[i].cantidad;
            contador++;
          }else{
            for(let m=0; m<this.detalleProductos.length; m++){
              if(this.detalleProductos[m].id === lista[i].idProducto){
                 this.detalleProductos[m].stock += lista[i].cantidad;
                 contador++;
              }else{
                this.detalleProductos[contador] = this.productos[j];
                this.detalleProductos[contador].stock = lista[i].cantidad;
                contador++;
              }
            }
          }
        }
      }
    }
    this.productos=this.detalleProductos
    return this.productos;
  }

  //Obtiene lista de detalleVentas
  DetalleVentas()
  {
    this.DetalleVentaService.gets().subscribe( r =>
      {
        this.detalles=r.data;
      }
    )
  }

  //Obtiene la cantidad total y ganancia total 
  Ventas()
  {
    this.VentaService.getReportes().subscribe( r =>
      {
        this.ventas=r.data;
        this.form.controls['cantidadTotal'].setValue(this.GenerarCantidades(this.BuscarDetalles(this.ventas)));
        this.form.controls['gananciaTotal'].setValue(this.GananciaTotal(this.BuscarDetalleProductos(this.BuscarDetalles(this.ventas))));
        //console.log(this.GenerarCantidades(this.BuscarDetalles(this.ventas)));
      }
    )
  }

  //Obtiene lista de productos
  Productos()
  {
    this.ProductoService.gets().subscribe( r =>
      {
        this.productos = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }
    )
  }

  //Obtiene cantidad total de prodcutos vendidos
  GenerarCantidades(lista : any){
    var contador = 0;
    for(let i=0; i<lista.length; i++){
      contador+=lista[i].cantidad;
    }
    return contador;
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Productos();
  }

  get fechaInicio(){ return this.form.get(this.formFechaInicio); }
  get fechaFin(){ return this.form.get(this.formFechaFin); }
  get cantidadTotal(){ return this.form.get(this.formCantidadTotal); }
  get gananciaTotal(){ return this.form.get(this.formGananciaTotal); }
}
