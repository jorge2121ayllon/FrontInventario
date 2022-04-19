import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { Router } from '@angular/router';
import { VentaService } from './../../../services/venta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  load: boolean= true;
  form: FormGroup;
  displayedColumns: string[] = ['nombreCliente','celular', 'total','fecha','acciones'];
  metadata :any;
  ventas : any ;


  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;


  constructor(private VentaService : VentaService,private Router: Router,
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
    this.Ventas();
  }


  Ventas()
  {
    this.load= false;
    this.VentaService.getVentas().subscribe( r =>
      {
        this.load=true;
        this.ventas = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No existe Ventas asociadas al Cliente")
        }
      }, error => {
        this.load=true;
        this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
      }
    )
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Ventas();
  }


  borrar(id : any)
  {
    this.load= false;
    const res = confirm('Seguro que desea eliminar el usuario');
    if (res){
        this.VentaService.deleteVenta(id).subscribe((data) => {
          this.load=true;
          this.toastr.success("Usuario Eliminado.")
          this.Ventas();
        }, error => {
          this.load=true;
          this.toastr.warning("no se Elimino, Por favor verifique su conexión a Internet","Error.")
        });
    }
  }

  Editar(id : any)
  {
    console.log('entro')
    this.Router.navigate(['/ventaedit/'+id]);
  }

  Filtro() {
    this.PaginacionService.Filtro.filter=this.form.value.filtro;
    this.Ventas();
  }

}
