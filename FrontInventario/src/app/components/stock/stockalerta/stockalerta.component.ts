import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { EMPTY, Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-stockalerta',
  templateUrl: './stockalerta.component.html',
  styleUrls: ['./stockalerta.component.css']
})
export class StockalertaComponent implements OnInit {
  productos :any;
  metadata :any;
  myimage: any;
  listaImg :Producto[]=[];

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl, private StockService : StockService,private Router: Router,private toastr: ToastrService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
    this.myimage= new Observable<any>();
   }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Productos();
  }

  VerificarLlenado(){
    if(!this.productos){
      this.toastr.info("No cuenta con Productos con bajo stock")
    }
  }

  Productos()
  {
    this.StockService.getStock().subscribe( r =>
      {
        this.productos = r.data;
        this.metadata = r.meta;
        this.length=this.metadata.totalCount;
        if(this.metadata.totalCount===0){
          this.toastr.info("No cuenta con Productos con bajo Stock")
        }
      }
    )
  }

  handlePage(e: PageEvent)
  {
   this.PaginacionService.Filtro.PageNumber=e.pageIndex+1;
   this.PaginacionService.Filtro.PageSize=e.pageSize;
   this.Productos();
  }

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
  this.myimage=result;
  return result
};
}
