import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoriaService } from './../../../services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { Observable, observable } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['precioCompra', 'precioVenta','genero', 'color','talla', 'marca','descripcion', 'stock','codigo', 'idCategoria','imagen','acciones'];
  categorias :any;
  productos :any;
  listaImg :Producto[]=[];
  myimage: any;
  metadata :any;
 
  

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;

  constructor(private fb : FormBuilder, private CategoriaService : CategoriaService,private ProductoService : ProductoService,private Router: Router,
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
        this.listaImg=this.productos;
        this.listaImgs(this.listaImg);
        this.metadata = r.meta;
        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No cuenta con Prodcutos")
        }
      }
    )
  }

  //almacena los productos en una lista local para convertir las img
  listaImgs(lista:any){
    for (let index = 0; index < lista.length; index++) {
            lista[index].imagen= this.toImage(lista[index].imagen)
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


  //sgte funcionalidad: 1.-vista  de stock con descripcion y cantidad de stock, 2.- vista de notificaciones
  //inicio 17-03-22 fin 20-03-22 


   //base 64 to image
   async toImage(url: any){
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

  //obtiene los nombres de las categorias
  getCategoria(id:any){
    for (let index = 0; index < this.categorias.length; index++) {
      if(this.categorias[index].id==id){return this.categorias[index].nombre;}
    }
  }
}
