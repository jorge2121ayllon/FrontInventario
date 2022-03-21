import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { FormGroup, FormBuilder, FormControl, Form } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from './../../../services/categoria.service';
import { disableDebugTools } from '@angular/platform-browser';
import { values } from 'lodash';


@Component({
  selector: 'app-stockdetalle',
  templateUrl: './stockdetalle.component.html',
  styleUrls: ['./stockdetalle.component.css']
})
export class StockdetalleComponent implements OnInit {

  public form: FormGroup;
  displayedColumns: string[] = ['descripcion','color','talla', 'stock','codigo','acciones'];
  categorias :any;
  productos :any;
  metadata :any;
  //checkbox

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;


  checkCategoria = new FormControl(false);
  checkDescripcion = new FormControl(false);
  checkColor = new FormControl(false);
  checkMarca = new FormControl(false);
  checkTalla = new FormControl(false);
  checkCodigo = new FormControl(false);

  constructor(public fb : FormBuilder,private StockService : StockService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl,  private toastr: ToastrService, private CategoriaService : CategoriaService) { 
      this.paginator.itemsPerPageLabel = "Registros por página";

      this.form = this.fb.group({
        categoria:new FormControl(''),
        descripcion:new FormControl(''),
        color:new FormControl(''),
        marca:new FormControl(''),
        talla:new FormControl(''),
        codigo:new FormControl(''),
      })
    }


  ngOnInit(): void {

    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Categorias();
  }

  Productos()
  {
    this.StockService.getDetalleStock().subscribe( r =>
      {
        console.log(r.data);
        this.productos = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }
    )
  }
  Categorias()
  {
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )
  }


  Editar(id : any)
  {
    this.Router.navigate(['/productoadd/'+id]);
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Productos();
  }

  applyFilter() {
    this.PaginacionService.Filtro.filter=this.form.value.categoria+'-'+this.form.value.descripcion+'-'+this.form.value.color+'-'+this.form.value.marca+'-'+this.form.value.talla+'-'+this.form.value.codigo;
    this.Productos();
  }
  //sgte funcionalidad: 1.-vista  de stock con descripcion y cantidad de stock, 2.- vista de notificaciones
  //inicio 17-03-22 fin 20-03-22 

}
