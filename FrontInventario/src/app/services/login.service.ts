import { UserLogin } from './../models/userLogin';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string='';
  httpOptions ={
    headers: new HttpHeaders(
      {
          'Content-Type':'application/json; charset=utf-8',
      })
  };

  constructor(private http : HttpClient, private Router:Router) {
    this.baseUrl=environment.appUrl+'api/Token';
  }


  LoginUser(UserLogin: UserLogin){
    return this.http.post(this.baseUrl, JSON.stringify(UserLogin), this.httpOptions);
  }

  getToken(){
    return localStorage.getItem('Token');
  }
  getRole(){
    return localStorage.getItem('Role')?.toUpperCase();
  }

  getUsuario(){
    return localStorage.getItem('Usuario')?.toUpperCase();
  }

  loggedIn(){
    return !!localStorage.getItem('Token');
  }

  loggedOut(){
    localStorage.removeItem('Token');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Role');
    this.Router.navigate(['/home']);
  }

}
