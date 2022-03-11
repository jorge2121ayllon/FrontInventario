import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  baseUrl: string='';
  constructor(private http : HttpClient, private PaginacionService : PaginacionService)
   {
    this.baseUrl=environment.appUrl+'api/venta'
   }

  saveVenta(Venta:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Venta));
  }

}
