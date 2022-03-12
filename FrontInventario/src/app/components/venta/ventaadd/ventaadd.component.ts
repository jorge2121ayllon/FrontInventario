import { Observable } from 'rxjs';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ProductoService } from './../../../services/producto.service';
import { Producto } from './../../../models/producto';
import { DetalleVenta } from './../../../models/detalleVenta';
import { VentaService } from './../../../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ventaadd',
  templateUrl: './ventaadd.component.html',
  styleUrls: ['./ventaadd.component.css']
})
export class VentaaddComponent implements OnInit {


  displayedColumns: string[] = ['cantidad', 'subtotal', 'idProducto', 'idVenta'];
  form: FormGroup;
  productos :any;

  //detalle
  listaDetalle: DetalleVenta[] = [{cantidad:3,subtotal:23}];
  detalleVenta: DetalleVenta = new DetalleVenta;



  //autocompletar
  searchTerm = new FormControl();

  cities: Producto[] = [{codigo:'x1',idCategoria:23},{codigo:'bussss',idCategoria:23}];
  FilteredCities!: Observable<Producto[]>;
  valor:string='';

  constructor(private fb : FormBuilder,private Router: Router,private Route : ActivatedRoute,
              private toastr: ToastrService,private VentaService: VentaService, private ProductoService: ProductoService,
              private PaginacionService: PaginacionService,)
              {
                this.form = this.fb.group({
                  total: new FormControl(1),
                  nombreCliente : new FormControl(''),
                  idProducto : new FormControl(1),
                  cantidad : new FormControl(1),
                })
              }

  ngOnInit(): void {
    this.obtenerProductos();
    this.FilteredCities = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map(value=> this._filter(value))
    )
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

  private _filter(value:string): Producto[]{
    const filtervalue = value.toLowerCase();
    console.log(this.FilteredCities)
    return this.cities.filter(city=>city.codigo?.toLowerCase().includes(filtervalue));

  }

  agregarDetalle()
  {

  }

  obtenerProductos()
  {
    this.PaginacionService.Filtro.filter='';
    this.PaginacionService.Filtro.PageSize=100000;
    this.PaginacionService.Filtro.PageNumber=1;

    this.ProductoService.gets().subscribe( r =>
      {

      }
    )

  }




}
