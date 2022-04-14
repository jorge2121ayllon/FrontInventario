import { DetalleCompra } from './../models/detalleCompra';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {
  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService)
  {
   this.baseUrl=environment.appUrl+'api/detalleCompra'
  }

  getDetallesCompra(id:number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+id+
    '&PageSize='+10000+
    '&PageNumber='+1)
  }

  saveDetalleCompra(DetalleCompra:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(DetalleCompra),
    this.PaginacionService.httpOptions);
  }

  deleteDetalleCompra(Id: number): Observable<DetalleCompra>{
    return this.http.delete(this.baseUrl+ "?id=" +Id);
  }
}
