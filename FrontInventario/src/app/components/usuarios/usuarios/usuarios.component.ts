import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { UsuarioaddComponent } from '../usuarioadd/usuarioadd.component'; 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})




export class UsuariosComponent implements OnInit {



  load: boolean= false;
  displayedColumns: string[] = ['usuario', 'role','gmail','acciones'];
  usuarios :any;
  metadata :any;
  form: FormGroup;

   // MatPaginator Inputs
   length = 100;
   pageSize = 5;
   pageSizeOptions: number[] = [5, 10,25, 100];
   pageIndex=0;

  constructor(public dialog: MatDialog,private fb : FormBuilder,private UsuarioService : UsuarioService,private Router: Router,
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
    this.load= false;


    this.UsuarioService.getUsers().subscribe( r =>
      {
        this.load=true;
        this.usuarios = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }, error => {
        this.load=true;
        this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
      }
    )
  }

  borrar(id : any)
  {
    const res = confirm('Seguro que desea eliminar el usuario');
    if (res){
        this.UsuarioService.deleteUser(id).subscribe((data) => {
          this.load=true;
          this.Usuarios();
          this.toastr.success("Usuario Eliminado.")
        }, error => {
          this.load=true;
          this.toastr.warning("no se Elimino, Por favor verifique su conexión a Internet","Error.")
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

  //modificaciones del sistema Version #2
  openDialog(id:number) {
    const dialogRef=this.dialog.open(UsuarioaddComponent, {
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe(result => {
     this.Usuarios();
    });
  }
}
