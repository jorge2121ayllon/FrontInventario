import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['precioCompra', 'precioVenta','genero', 'color','talla', 'marca','descripcion', 'stock','codigo', 'idCategoria','acciones'];
  categorias :any;
  productos :any;
  metadata :any;
  

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;

  constructor(private fb : FormBuilder, private CategoriaService : CategoriaService,private ProductoService : ProductoService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl,  private toastr: ToastrService) { 
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
    this.Productos();
  }

  Categorias()
  {
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )
  }
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

  borrar(id : any)
  {
    const res = confirm('Seguro que desea eliminar la categoria');
    if (res){
        this.ProductoService.delete(id).subscribe((data) => {
          this.Productos();
          this.toastr.success("Categoria Eliminada.")
        });
    }
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
    this.PaginacionService.Filtro.filter=this.form.value.filtro;
    this.Productos();
  }


}
