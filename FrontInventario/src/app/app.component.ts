import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontInventario';
  constructor(public _authService:LoginService) {}
}
