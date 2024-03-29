import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { CategoriaaddComponent } from '../categoriaadd/categoriaadd.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  categorias :any;
  metadata :any;
  form: FormGroup;

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;
  load: boolean= true;

  constructor(public dialog: MatDialog, private fb : FormBuilder,private CategoriaService : CategoriaService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl, private toastr: ToastrService) { 
      this.paginator.itemsPerPageLabel = "Registros por página";
      this.form = this.fb.group({
        filtro: new FormControl('')
      })
    }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Categorias();
  }


  Categorias()
  {
    this.load= false;
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.load=true;
        this.categorias = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No cuenta con Categorias")
        }
      }, error => {
        this.load=true;
        this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
      }
    )
  }

  borrar(id : any)
  {
    this.load= false;
    const res = confirm('Seguro que desea eliminar la categoria');
    if (res){
        this.CategoriaService.deleteCategoria(id).subscribe((res) => {
          this.load=true;
          this.Categorias();
          if(res.data){
            this.toastr.warning("Categoria Eliminada Con Éxito")
          }else if(!res.data){
            this.toastr.warning("No se puede Eliminar la Categoria porque se encuentra vinculada a un Producto")
          }
        }, error => {
          this.load=true;
          this.toastr.warning("no se Elimino, Por favor verifique su conexión a Internet","Error.")
        });
    }
  }

  Editar(id : any)
  {
    this.Router.navigate(['/categoriaadd/'+id]);
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Categorias();
  }

  applyFilter() {
    this.PaginacionService.Filtro.filter=this.form.value.filtro;
    this.Categorias();
  }

  //modificaciones del sistema Version #2
  openDialog(id:number) {
    const dialogRef=this.dialog.open(CategoriaaddComponent, {
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe(result => {
     this.Categorias();
    });
  }
}
