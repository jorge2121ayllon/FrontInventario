import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginacionService } from 'src/app/services/paginacion.service';

@Component({
  selector: 'app-stockalerta',
  templateUrl: './stockalerta.component.html',
  styleUrls: ['./stockalerta.component.css']
})
export class StockalertaComponent implements OnInit {
  productos :any;
  metadata :any;

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10,25, 100];
  pageIndex=0;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private PaginacionService: PaginacionService, private paginator: MatPaginatorIntl, private StockService : StockService,private Router: Router,private toastr: ToastrService) {
    this.paginator.itemsPerPageLabel = "Registros por página";
   }

  ngOnInit(): void {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=5;
    this.PaginacionService.Filtro.PageNumber=1;
    this.Productos();
  }

  Productos()
  {
    this.StockService.getStock().subscribe( r =>
      {
        console.log(r.data)
        this.productos = r.data;
        this.metadata = r.meta;

        this.length=this.metadata.totalCount;
      }
    )
  }

}
