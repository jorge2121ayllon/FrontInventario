import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
    this.toImage(this.data.creado.imagen);
  }
  async toImage(url: any){
  
    var res =  await fetch(url);
    var blob =  (await res).blob();
  
    const result =  new Promise(async (resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(await blob);
    })
    this.myimage=result;
    return result
  };
}
