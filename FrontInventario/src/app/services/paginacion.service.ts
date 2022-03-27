import { Filtro } from './../models/filtro';
import { Injectable } from '@angular/core';
import { Filtros } from '../models/filtros';

@Injectable({
  providedIn: 'root'
})
export class  PaginacionService {

  Filtro : Filtro = new Filtro;
  Filtros : Filtros = new Filtros;

  constructor() {
    this.Filtro.filter="";
    this.Filtro.PageNumber=1;
    this.Filtro.PageSize=5;

    this.Filtros.filter="";
    this.Filtros.categoria=0;
    this.Filtros.descripcion="";
    this.Filtros.color="";
    this.Filtros.marca="";
    this.Filtros.talla="";
    this.Filtros.codigo="";
    this.Filtros.PageNumber=1;
    this.Filtros.PageSize=5;
   }
}
