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
  precio:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductosaddComponent) {
    this.myimage= new Observable<any>();
   }

  ngOnInit(): void {
    this.precio=this.data.creado.precioVenta;
    this.myimage=environment.appUrl+this.data.creado.imagen;
  }

  printer() {
    const printContent = document.getElementById("print");
    const WindowPrt = window.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(printContent!.innerHTML);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
  }

}
