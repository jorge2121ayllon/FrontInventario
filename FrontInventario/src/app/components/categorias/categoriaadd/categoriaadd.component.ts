import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from './../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoriaadd',
  templateUrl: './categoriaadd.component.html',
  styleUrls: ['./categoriaadd.component.css']
})
export class CategoriaaddComponent implements OnInit {

  form: FormGroup;
  idCategoria: number=0;
  constructor(private fb : FormBuilder,private Router: Router, private CategoriaService:
    CategoriaService,private Route : ActivatedRoute,  private toastr: ToastrService) 
    {
      if(this.Route.snapshot.params.id>0){
        this.idCategoria = this.Route.snapshot.params.id;
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
          nombre: new FormControl('',Validators.required),
          descripcion: new FormControl('',Validators.required),
        })
      }
      else{
        this.form = this.fb.group({
          id: this.Route.snapshot.params.id,
          nombre: new FormControl('',Validators.required),
          descripcion: new FormControl('',Validators.required),
        })
      }
    }

  ngOnInit(): void {
    if(this.Route.snapshot.params.id>0){
      this.CategoriaService.getCategoria(this.Route.snapshot.params.id).subscribe(
        r=>{
          this.form.controls['nombre'].setValue(r.data.nombre)
          this.form.controls['descripcion'].setValue(r.data.descripcion)
        }
      )
    }
  }

  Guardar(){
    if(this.Route.snapshot.params.id>0){
      this.CategoriaService.updateCategoria(this.form.value).subscribe
      (
        r=> {
          this.Router.navigate(['categorias']);
          this.toastr.success("se edito exitosamente","Editado.")
        },
        error => {
          this.toastr.warning("no se edito","Error.")
        }
      )
    }
    else{
      this.CategoriaService.saveCategoria(this.form.value).subscribe
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
  }

}
