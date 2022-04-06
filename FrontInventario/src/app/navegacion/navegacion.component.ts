import { StockService } from 'src/app/services/stock.service';
import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  productos :any;
  listaStock:Producto[]=[];
  cantidad:any;
  usuario:any;
  rol:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public _authService:LoginService, private StockService : StockService) {}

  ngOnInit(): void {
   this.usuario =   localStorage.getItem('Usuario');
   this.rol =   localStorage.getItem('Role');
   this.Productos();
  }

  IsAdmin()
  {
    if(localStorage.getItem('Role')=="Administrador")
    {
      return true
    }
    return false
  }
  IsVendedor()
  {
    if(localStorage.getItem('Role')=="Vendedor")
    {
      return true
    }

    return false
  }


  Productos()
  {
    this.StockService.getStockcantidad().subscribe( r =>
      {
        this.productos = r.data;
        var group=this.groupBy(r.data, (producto: { codigo: any; }) => producto.codigo);
        this.cantidad=group.size;
      }
    )
  }
   groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item:any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}


}
