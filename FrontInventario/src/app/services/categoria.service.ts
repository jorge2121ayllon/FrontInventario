import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from './../models/response';
import { Categoria } from './../models/categoria';
import { PaginacionService } from './paginacion.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: string='';

  constructor(private http : HttpClient, private PaginacionService : PaginacionService) {
    this.baseUrl=environment.appUrl+'api/categoria'
   }

   getCategorias(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
   }

   saveCategoria(Categoria:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(Categoria));
  }

  updateCategoria(Categoria : Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(this.baseUrl +"/"+ Categoria.id, JSON.stringify(Categoria));
  }

  deleteCategoria(categoriaId: number): Observable<Categoria>{
    return this.http.delete(this.baseUrl+ "?id=" +categoriaId);
  }

  getCategoria(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }

}
