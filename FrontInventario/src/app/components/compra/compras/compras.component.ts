import { CompraService } from './../../../services/compra.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = [ 'fecha','total','acciones'];
  metadata :any;
  compras : any ;


  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;


  constructor(private CompraService: CompraService,private Router: Router,
    private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl,  private toastr: ToastrService,
    private fb : FormBuilder) {
            this.paginator.itemsPerPageLabel = "Registros por página";

            this.form = this.fb.group({
              filtro: new FormControl('')
            })
     }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Compras();
  }

  Compras()
  {
    this.CompraService.getCompras().subscribe( r =>
      {
        this.compras = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }
    )
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Compras();
  }

  borrar(id : any)
  {
    const res = confirm('Seguro que desea eliminar el usuario');
    if (res){
        this.CompraService.deleteCompra(id).subscribe((data) => {
          this.toastr.success("Usuario Eliminado.")
          this.Compras();
        });
    }
  }

  Editar(id : any)
  {
    this.Router.navigate(['/compraedit/'+id]);
  }

  Filtro() {
    this.PaginacionService.Filtro.filter=this.form.value.filtro;
    this.Compras();
  }

}
