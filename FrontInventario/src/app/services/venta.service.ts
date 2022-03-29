import { Venta } from './../models/venta';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from './../models/response';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService)
   {
    this.baseUrl=environment.appUrl+'api/venta'
   }

  getVentas(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
  }

  saveVenta(Venta:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Venta));
  }

  deleteVenta(ventaId: number): Observable<Venta>{
    return this.http.delete(this.baseUrl+ "?id=" +ventaId);
  }
  getVenta(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  updateVenta(Venta : any): Observable<Response>{
    return this.http.put<Response>(this.baseUrl, JSON.stringify(Venta));
  }

  getReportes(inicio : Date , fin : Date): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+inicio+"/"+fin)
  }


}
