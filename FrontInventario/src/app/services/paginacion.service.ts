import { Filtro } from './../models/filtro';
import { FiltroDate } from './../models/filtroDate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class  PaginacionService {

  Filtro : Filtro = new Filtro;
  FiltroDate: FiltroDate = new FiltroDate;

  constructor() {
    this.Filtro.filter="";
    this.Filtro.PageNumber=1;
    this.Filtro.PageSize=5;

    this.FiltroDate.dateInit=new Date();
    this.FiltroDate.dateEnd=new Date();
    this.FiltroDate.PageNumber=1;
    this.FiltroDate.PageSize=5;
   }
}
