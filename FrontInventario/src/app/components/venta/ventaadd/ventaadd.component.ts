import { DetalleVenta } from './../../../models/detalleVenta';
import { VentaService } from './../../../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventaadd',
  templateUrl: './ventaadd.component.html',
  styleUrls: ['./ventaadd.component.css']
})
export class VentaaddComponent implements OnInit {


  displayedColumns: string[] = ['cantidad', 'subtotal', 'idProducto', 'idVenta'];
  form: FormGroup;

  //detalle
  listaDetalle: DetalleVenta[] = [{cantidad:3,subtotal:23}];
  detalleVenta: DetalleVenta = new DetalleVenta;



  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
              private toastr: ToastrService,private VentaService: VentaService)
              {
                this.form = this.fb.group({
                  total: new FormControl(1),
                  nombreCliente : new FormControl(''),
                  idProducto : new FormControl(1),
                  cantidad : new FormControl(1),
                })

              }

  ngOnInit(): void {

  }

  Guardar(){

    this.detalleVenta=this.form.value;
    this.listaDetalle.push(this.detalleVenta);
  }

  metodooo()
  {
    this.VentaService.saveVenta(this.form.value).subscribe
    (
      r=> {
        this.Router.navigate(['categorias']);
        this.toastr.success("se guardo exitosamente","Guardado.")
      },
      error => {
        this.toastr.warning("no se guardo","Error.")
      }
    )
  }

  agregarDetalle()
  {

  }


}
