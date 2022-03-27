import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontInventario';
  productos :any;
  cantidad:any;
  constructor(public _authService:LoginService, private StockService : StockService) {}
  ngOnInit(): void {
    this.Productos();
  }

  Productos()
  {
    this.StockService.getStock().subscribe( r =>
      {
        this.productos = r.data;
        this.cantidad=r.data.length;
      }
    )
  }
}
