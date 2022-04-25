import { ToastrService } from 'ngx-toastr';
import { reporteClientes } from './../../../models/reporteClientes';
import { DetalleVenta } from './../../../models/detalleVenta';
import { VentaService } from './../../../services/venta.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporteclientes',
  templateUrl: './reporteclientes.component.html',
  styleUrls: ['./reporteclientes.component.css']
})
export class ReporteclientesComponent implements OnInit {
  load: boolean= true;
  reportes: reporteClientes[]=[];
  form : FormGroup;

  constructor(private VentaService: VentaService,  private fb : FormBuilder,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      inicio: new FormControl('',Validators.required),
      fin: new FormControl('',Validators.required),
      genero: new FormControl('Todos',Validators.required)
    })
   }

  ngOnInit(): void {

  }


  Buscar()
  {
    this.load=false;
    this.VentaService.getReportesClientes( this.form.value.genero,this.form.value.inicio , this.form.value.fin).subscribe(
      v=> {
        this.reportes= v as any;
        this.load= true;
      },
      error => {
        this.toastr.warning("Porfavor verifique su conexion a internet.","Error al cargar");
        this.load=true;
      })
  }

}
