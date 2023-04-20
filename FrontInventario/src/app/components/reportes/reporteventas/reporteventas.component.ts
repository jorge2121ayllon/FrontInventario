import { ToastrService } from 'ngx-toastr';
import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { VentaService } from './../../../services/venta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporteventas',
  templateUrl: './reporteventas.component.html',
  styleUrls: ['./reporteventas.component.css']
})
export class ReporteventasComponent implements OnInit {
  load: boolean= true;
  reportes: any;
  form : FormGroup;
  ganaciaTotal = 0;
  cantidadTotal = 0;
  inversionTotal = 0;
  vendidoTotal = 0;
  descuento = 0;
  alertar=0;


  displayedColumns: string[] = ['Descripcion', 'Stock','Precio Venta','Precio Compra','Cantidad Vendida','Inversion', 'Descuento' , 'Venta', 'Ganancia' ];

  constructor(private VentaService: VentaService,  private fb : FormBuilder,
    private toastr: ToastrService) {
      this.form = this.fb.group({
        inicio: new FormControl('',Validators.required),
        fin: new FormControl('',Validators.required),
        genero: new FormControl('Todos',Validators.required)
      })
   }

  ngOnInit(  ): void {

  }

  Buscar()
  {
    this.load=false;
    this.alertar=0;
    this.ganaciaTotal = 0;
    this.cantidadTotal = 0;
    this.inversionTotal = 0;
    this.vendidoTotal = 0;
    this.descuento = 0;


    this.VentaService.getReportes( this.form.value.genero, this.form.value.inicio , this.form.value.fin).subscribe(
      v=> {
        this.reportes = v as any;
        console.log(this.reportes)
        for (let index = 0; index < this.reportes.length; index++) {
         this.ganaciaTotal=this.ganaciaTotal+this.reportes[index].totalGanancia;
         this.cantidadTotal=this.cantidadTotal+this.reportes[index].cantidadVendida;
         this.inversionTotal=this.inversionTotal+this.reportes[index].totalInversion;
         this.vendidoTotal= this.vendidoTotal+this.reportes[index].totalVendido;
         this.descuento =this.descuento+ this.reportes[index].descuento;
        }
        if( this.reportes.length==0)
          {
            this.alertar=1;
          }
          this.load=true;
      },
      error => {
        this.toastr.warning("Porfavor verifique su conexion a internet.","Error al cargar");
        this.load=true;
      })


  }
}
