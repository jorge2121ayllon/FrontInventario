import { Filtro } from './../models/filtro';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  PaginacionService {

  Filtro : Filtro = new Filtro;

  constructor() {
    this.Filtro.filter="";
    this.Filtro.PageNumber=1;
    this.Filtro.PageSize=5;
   }
}
