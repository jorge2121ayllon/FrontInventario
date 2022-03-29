import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from './../models/response';
import { Producto } from '../models/producto';
import { PaginacionService } from './paginacion.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService) {
    this.baseUrl=environment.appUrl+'api/producto'
   }

  getStock(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/"+1+"/"+1+"/"+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
   }
   getStockcantidad(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+"/"+2+"/"+2+"/"+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
   }
   
   getDetalleStock(): Observable<Response>{

    var filtro=this.PaginacionService.Filtros.filter;
    var categoria=this.PaginacionService.Filtros.categoria;
    var descripcion=this.PaginacionService.Filtros.descripcion;
    var color=this.PaginacionService.Filtros.color;
    var marca=this.PaginacionService.Filtros.marca;
    var talla=this.PaginacionService.Filtros.talla;
    var codigo=this.PaginacionService.Filtros.codigo;

    return this.http.get<Response>(this.baseUrl+"/"+1+"/"+1+"/"+1+"/"+'?filter='+filtro+'&categoria='+categoria+'&descripcion='+descripcion+
    '&color='+color+'&marca='+marca+'&talla='+talla+'&codigo='+codigo+
    '&PageSize='+this.PaginacionService.Filtros.PageSize+
    '&PageNumber='+this.PaginacionService.Filtros.PageNumber)
   }
}
