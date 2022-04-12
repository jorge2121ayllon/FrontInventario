import { Filtro } from './../models/filtro';
import { FiltroDate } from './../models/filtroDate';
import { Injectable } from '@angular/core';
import { Filtros } from '../models/filtros';

@Injectable({
  providedIn: 'root'
})
export class  PaginacionService {

  Filtro : Filtro = new Filtro;
  Filtros : Filtros = new Filtros;
  FiltroDate: FiltroDate = new FiltroDate;

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
    this.Filtros.genero="";
    this.Filtros.PageNumber=1;
    this.Filtros.PageSize=5;
    this.FiltroDate.dateInit=new Date();
    this.FiltroDate.dateEnd=new Date();
    this.FiltroDate.PageNumber=1;
    this.FiltroDate.PageSize=5;
   }
}
