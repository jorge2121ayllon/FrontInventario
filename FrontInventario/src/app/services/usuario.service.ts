import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from './../models/response';
import { User } from './../models/usuario';
import { PaginacionService } from './paginacion.service';
//import { PaginacionService } from './paginacion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string='';

  constructor(private http : HttpClient, private PaginacionService : PaginacionService) {
    this.baseUrl=environment.appUrl+'api/user'
  }

  getUsers(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl+'?filter='+this.PaginacionService.Filtro.filter+
    '&PageSize='+this.PaginacionService.Filtro.PageSize+
    '&PageNumber='+this.PaginacionService.Filtro.PageNumber)
  }

  saveUser(User:any): Observable<Response>{
    return this.http.post<Response>(this.baseUrl, JSON.stringify(User));
  }

  updateUser(User : User): Observable<User>{
    return this.http.put<User>(this.baseUrl +"/"+ User.id, JSON.stringify(User));
  }

  deleteUser(userId: number): Observable<User>{
    return this.http.delete(this.baseUrl+ "?id=" +userId);
  }

  getUser(Id: number): Observable<Response>{
    return this.http.get<Response>(this.baseUrl +"/"+ Id);
  }


}
