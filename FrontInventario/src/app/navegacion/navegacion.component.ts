import { StockService } from 'src/app/services/stock.service';
import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  productos :any;
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


  Productos()
  {
    this.StockService.getStockcantidad().subscribe( r =>
      {
        this.productos = r.data;
        this.cantidad=r.data.length;
      }
    )
  }
}
