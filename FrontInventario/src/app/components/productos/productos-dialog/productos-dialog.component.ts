import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ProductosaddComponent } from '../productosadd/productosadd.component';
@Component({
  selector: 'app-productos-dialog',
  templateUrl: './productos-dialog.component.html',
  styleUrls: ['./productos-dialog.component.css']
})
export class ProductosDialogComponent implements OnInit {
  myimage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductosaddComponent) {
    this.myimage= new Observable<any>();
   }

  ngOnInit(): void {
    this.myimage=environment.appUrl+this.data.creado.imagen;
  }

}
