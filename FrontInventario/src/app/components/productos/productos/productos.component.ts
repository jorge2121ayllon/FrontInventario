import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductosaddComponent } from '../productosadd/productosadd.component';
import { ProductosDialogComponent } from '../productos-dialog/productos-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  load: boolean= false;
  form: FormGroup;
  displayedColumns: string[] = ['precioCompra', 'precioVenta','genero', 'color','talla', 'marca','descripcion', 'stock','codigo', 'idCategoria','imagen','acciones'];
  categorias :any;
  productos :any;
  myimage: any;
  metadata :any;
  envairomentGloblal= environment.appUrl;


  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;

  constructor(public dialog: MatDialog,private fb : FormBuilder, private CategoriaService : CategoriaService,private ProductoService : ProductoService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl,  private toastr: ToastrService) {
      this.paginator.itemsPerPageLabel = "Registros por página";
      this.myimage= new Observable<any>();
      this.form = this.fb.group({
        filtro: new FormControl('')
      })
    }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Productos();
    this.Categorias();
  }

  Categorias()
  {
    this.CategoriaService.getCategoriasProducto().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )

  }


  Productos()
  {
    this.load= false;
    this.ProductoService.gets().subscribe( r =>
      {
        this.productos = r.data;

        this.metadata = r.meta;
        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No cuenta con Prodcutos")
        }
        this.load=true;
      },
      error => {
        this.toastr.warning("Porfavor verifique su conexion a internet.")
        this.load=true;
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
//modificaciones del sistema Version #2
openDialog(id:number) {
  const dialogRef=this.dialog.open(ProductosaddComponent, {
    data: {id: id},
  });
  dialogRef.afterClosed().subscribe(result => {
   this.Productos();
  });
}
//modificaciones del sistema Version #2
openDialogCode(creado: any) {
  this.dialog.open(ProductosDialogComponent, {
    data: {
      creado:creado,
    },
  });
}



  //obtiene los nombres de las categorias
  getCategoria(id:any){
    for (let index = 0; index < this.categorias?.length; index++) {
      if(this.categorias[index].id==id){return this.categorias[index].nombre;}
    }
  }
}
