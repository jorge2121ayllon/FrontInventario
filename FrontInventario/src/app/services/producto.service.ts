import { Producto } from 'src/app/models/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from './../models/response';
import { PaginacionService } from './paginacion.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl: string='';


  constructor(private http : HttpClient, private PaginacionService : PaginacionService) {
    this.baseUrl=environment.appUrl+'api/producto'
   }

   gets(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
   }


  saveImagen(file:Blob ): Observable<Response>{

    const formData = new FormData();
    formData.append('file', file );
    return this.http.post<Response>(this.baseUrl,
    formData);
  }

  save(Producto:Producto ): Observable<Response>{;
    return this.http.post<Response>(this.baseUrl +"/"+ 1, JSON.stringify(Producto),
    this.PaginacionService.httpOptions);
  }

  update(Producto : Producto): Observable<Producto>{
    return this.http.put<Producto>(this.baseUrl +"/"+ Producto.id, JSON.stringify(Producto),
    this.PaginacionService.httpOptions);
  }

  delete(Id: number): Observable<Producto>{
    return this.http.delete(this.baseUrl+ "?id=" +Id);
  }

  get(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }
}
