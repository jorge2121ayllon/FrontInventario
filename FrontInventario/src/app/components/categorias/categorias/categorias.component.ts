import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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

  constructor(private fb : FormBuilder,private CategoriaService : CategoriaService,private Router: Router,
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
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.categorias = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No cuenta con Categorias")
        }
      }
    )
  }

  borrar(id : any)
  {
    const res = confirm('Seguro que desea eliminar la categoria');
    if (res){
        this.CategoriaService.deleteCategoria(id).subscribe((res) => {
          this.Categorias();
          if(res.data){
            this.toastr.warning("Categoria Eliminada Con Éxito")
          }else if(!res.data){
            this.toastr.warning("No se puede Eliminar la Categoria porque se encuentra vinculada a un Producto")
          }
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

}
