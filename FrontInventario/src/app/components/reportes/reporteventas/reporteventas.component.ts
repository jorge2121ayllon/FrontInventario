import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VentaService } from './../../../services/venta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporteventas',
  templateUrl: './reporteventas.component.html',
  styleUrls: ['./reporteventas.component.css']
})
export class ReporteventasComponent implements OnInit {

  reportes: any;
  form : FormGroup;
  ganaciaTotal = 0;
  cantidadTotal = 0;
  inversionTotal = 0;
  vendidoTotal = 0;
  alertar=0;


  displayedColumns: string[] = ['Descripcion', 'Stock','Precio Venta','Precio Compra','Cantidad Vendida','Inversion', 'Venta', 'Ganancia' ];

  constructor(private VentaService: VentaService,  private fb : FormBuilder) {
      this.form = this.fb.group({
        inicio: new FormControl('',Validators.required),
        fin: new FormControl('',Validators.required)
      })
   }

  ngOnInit(  ): void {

  }

  Buscar()
  {
    this.alertar=0;
    this.ganaciaTotal = 0;
    this.cantidadTotal = 0;
    this.inversionTotal = 0;
    this.vendidoTotal = 0;


    this.VentaService.getReportes( this.form.value.inicio , this.form.value.fin).subscribe(
      v=> {
        this.reportes = v as any;

        for (let index = 0; index < this.reportes.length; index++) {
         this.ganaciaTotal=this.ganaciaTotal+this.reportes[index].totalGanancia;
         this.cantidadTotal=this.cantidadTotal+this.reportes[index].cantidadVendida;
         this.inversionTotal=this.inversionTotal+this.reportes[index].totalInversion;
         this.vendidoTotal=this.vendidoTotal+this.reportes[index].totalVendido;
        }
        if( this.reportes.length==0)
          {
            this.alertar=1;
          }
      }
    )


  }
}
