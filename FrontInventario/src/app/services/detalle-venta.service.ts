import { Observable } from 'rxjs';
import { DetalleVenta } from './../models/detalleVenta';
import { environment } from './../../environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService)
   {
    this.baseUrl=environment.appUrl+'api/detalleVenta'
   }

  saveDetalleVenta(DetalleVenta:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(DetalleVenta));
  }

}
