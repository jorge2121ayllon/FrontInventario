import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service'; 
import { CategoriaService } from 'src/app/services/categoria.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productosadd',
  templateUrl: './productosadd.component.html',
  styleUrls: ['./productosadd.component.css']
})
export class ProductosaddComponent implements OnInit {

  form: FormGroup;
  idProducto: number=0;
  categorias :any;
  constructor(private fb : FormBuilder,private Router: Router, private ProductoService:
    ProductoService, private CategoriaService:
    CategoriaService, private Route : ActivatedRoute, private toastr: ToastrService) 
    {
      if(this.Route.snapshot.params.id>0){
        this.idProducto = this.Route.snapshot.params.id;
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
          precioCompra: new FormControl('',Validators.required),
          precioVenta: new FormControl('',Validators.required),
          genero: new FormControl('',Validators.required),
          color: new FormControl('',Validators.required),
          talla: new FormControl('',Validators.required),
          marca: new FormControl('',Validators.required),
          descripcion: new FormControl('',Validators.required),
          stock: new FormControl('',Validators.required),
          idCategoria: new FormControl('',Validators.required),
        })
      }
      else{
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
          precioCompra: new FormControl('',Validators.required),
          precioVenta: new FormControl('',Validators.required),
          genero: new FormControl('',Validators.required),
          color: new FormControl('',Validators.required),
          talla: new FormControl('',Validators.required),
          marca: new FormControl('',Validators.required),
          descripcion: new FormControl('',Validators.required),
          stock: new FormControl('',Validators.required),
          idCategoria: new FormControl('',Validators.required),
        })
      }
    }

  ngOnInit(): void {
    this.Categorias();
    if(this.Route.snapshot.params.id>0){
      this.ProductoService.get(this.Route.snapshot.params.id).subscribe(
        r=>{
          this.form.controls['precioCompra'].setValue(r.data.precioCompra)
          this.form.controls['precioVenta'].setValue(r.data.precioVenta)
          this.form.controls['genero'].setValue(r.data.genero)
          this.form.controls['color'].setValue(r.data.color)
          this.form.controls['talla'].setValue(r.data.talla)
          this.form.controls['marca'].setValue(r.data.marca)
          this.form.controls['descripcion'].setValue(r.data.descripcion)
          this.form.controls['stock'].setValue(r.data.stock)
          this.form.controls['idCategoria'].setValue(r.data.idCategoria)
        }
      )
    }
  }

  Guardar(){
    if(this.Route.snapshot.params.id>0){
      this.ProductoService.update(this.form.value).subscribe
      (
        r=> {
          this.Router.navigate(['productos']);
          this.toastr.success("se edito exitosamente","Editado.")
        },
        error => {
          this.toastr.warning("no se edito","Error.")
        }
      )
    }
    else{
      this.ProductoService.save(this.form.value).subscribe
      (
        r=> {
          this.Router.navigate(['productos']);
          this.toastr.success("se guardo exitosamente","Guardado.")
        },
        error => {
          this.toastr.warning("no se guardo","Error.")
        }
      )
    }
  }

  Categorias()
  {
    this.CategoriaService.getCategorias().subscribe( r =>
      {
        this.categorias = r.data;
      }
    )
  }

  

}
