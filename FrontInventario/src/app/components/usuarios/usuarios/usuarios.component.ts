import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})




export class UsuariosComponent implements OnInit {




  displayedColumns: string[] = ['usuario', 'role','gmail','acciones'];
  usuarios :any;
  metadata :any;
  form: FormGroup;

   // MatPaginator Inputs
   length = 100;
   pageSize = 5;
   pageSizeOptions: number[] = [5, 10,25, 100];
   pageIndex=0;

  constructor(private fb : FormBuilder,private UsuarioService : UsuarioService,private Router: Router,
    private PaginacionService: PaginacionService, private paginators: MatPaginatorIntl,  private toastr: ToastrService) {
      this.paginators.itemsPerPageLabel = "Registros por página";

      this.form = this.fb.group({
        filtro: new FormControl('')
      })
    }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Usuarios();
  }

  Usuarios()
  {


    this.UsuarioService.getUsers().subscribe( r =>
      {
        this.usuarios = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }
    )
    console.log(this.usuarios)
  }

  borrar(id : any)
  {
    const res = confirm('Seguro que desea eliminar el usuario');
    if (res){
        this.UsuarioService.deleteUser(id).subscribe((data) => {
          this.Usuarios();
          this.toastr.success("Usuario Eliminado.")
        });
    }
  }

  Editar(id : any)
  {
    this.Router.navigate(['/usuarioadd/'+id]);
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Usuarios();
  }

  applyFilter() {
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.PaginacionService.Filtro.filter=this.form.value.filtro;
    this.length = 0;
    this.pageIndex=0;
    this.Usuarios();
  }
}
