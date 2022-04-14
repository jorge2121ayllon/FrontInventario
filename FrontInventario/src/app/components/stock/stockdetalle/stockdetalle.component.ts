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
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-stockdetalle',
  templateUrl: './stockdetalle.component.html',
  styleUrls: ['./stockdetalle.component.css']
})
export class StockdetalleComponent implements OnInit {

  public form: FormGroup;
  displayedColumns: string[] = ['descripcion','marca','color','talla', 'stock','codigo','genero','imagen','acciones'];
  categorias :any;
  productos :any;
  metadata :any;
  myimage: any;
  envairomentGloblal= environment.appUrl;

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
  checkGenero = new FormControl(false);

  constructor(public fb : FormBuilder,private StockService : StockService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl,  private toastr: ToastrService, private CategoriaService : CategoriaService) {
      this.paginator.itemsPerPageLabel = "Registros por página";
      this.myimage= new Observable<any>();
      this.form = this.fb.group({
        categoria:new FormControl(0),
        descripcion:new FormControl(''),
        color:new FormControl(''),
        marca:new FormControl(''),
        talla:new FormControl(''),
        codigo:new FormControl(''),
        genero:new FormControl(''),
      })
    }


  ngOnInit(): void {

    this.PaginacionService.Filtros.filter='';
    this.PaginacionService.Filtros.categoria=0;
    this.PaginacionService.Filtros.descripcion='';
    this.PaginacionService.Filtros.color='';
    this.PaginacionService.Filtros.marca='';
    this.PaginacionService.Filtros.talla='';
    this.PaginacionService.Filtros.codigo='';
    this.PaginacionService.Filtros.genero='';
    this.PaginacionService.Filtros.PageSize=5;
    this.PaginacionService.Filtros.PageNumber=1;
    this.Categorias();
  }

  Productos()
  {

    this.StockService.getDetalleStock().subscribe( r =>
      {
        this.productos = r.data;
        this.metadata = r.meta;
        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No existe productos con los filtros enviados")
        }
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
   this.PaginacionService.Filtros.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtros.PageSize=e.pageSize;
   this.Productos();
  }

  applyFilter() {
    this.Limpiador()
    this.PaginacionService.Filtros.filter='si';
    this.PaginacionService.Filtros.categoria=Number(this.form.value.categoria);
    this.PaginacionService.Filtros.descripcion=this.form.value.descripcion;
    this.PaginacionService.Filtros.color=this.form.value.color;
    this.PaginacionService.Filtros.marca=this.form.value.marca;
    this.PaginacionService.Filtros.talla=this.form.value.talla;
    this.PaginacionService.Filtros.codigo=this.form.value.codigo;
    this.PaginacionService.Filtros.genero=this.form.value.genero;
    this.Productos();
  }



Limpiador()
{

  if(this.checkColor.value==false)
  {
    this.form.value.color='';
  }
  if(this.checkCategoria.value==false)
  {
    this.form.value.categoria=0;
  }
  if(this.checkMarca.value==false)
  {
    this.form.value.marca='';
  }
  if(this.checkDescripcion.value==false)
  {
    this.form.value.descripcion='';
  }
  if(this.checkTalla.value==false)
  {
    this.form.value.talla='';
  }
  if(this.checkCodigo.value==false)
  {
    this.form.value.codigo='';
  }
  if(this.checkGenero.value==false)
  {
    this.form.value.genero='';
  }
}

}


