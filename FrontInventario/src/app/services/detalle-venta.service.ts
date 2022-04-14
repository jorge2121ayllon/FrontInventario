import { Observable } from 'rxjs';
import { DetalleVenta } from './../models/detalleVenta';
import { environment } from './../../environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from './../models/response';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService)
   {
    this.baseUrl=environment.appUrl+'api/detalleVenta'
   }

  getDetallesVenta(id:number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+id+
    '&PageSize='+10000+
    '&PageNumber='+1)
  }

  saveDetalleVenta(DetalleVenta:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(DetalleVenta), this.PaginacionService.httpOptions);
  }

  deleteDetalleVenta(Id: number): Observable<DetalleVenta>{
    return this.http.delete(this.baseUrl+ "?id=" +Id);
  }

  gets(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
  }

}
