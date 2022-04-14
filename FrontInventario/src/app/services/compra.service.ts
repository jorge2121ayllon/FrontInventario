import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../models/compra';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  baseUrl: string='';

  constructor(private http: HttpClient,private PaginacionService: PaginacionService) {
    this.baseUrl=environment.appUrl+'api/compra'
   }

   getCompras(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
  }

  saveCompra(Compra:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Compra), this.PaginacionService.httpOptions);
  }

  deleteCompra(CompraId: number): Observable<Compra>{
    return this.http.delete(this.baseUrl+ "?id=" +CompraId);
  }
  getCompra(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

  updateCompra(Compra : any): Observable<Response>{
    return this.http.put<Response>(this.baseUrl, JSON.stringify(Compra), this.PaginacionService.httpOptions);
  }


}
