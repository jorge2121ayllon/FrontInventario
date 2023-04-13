import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from './../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CategoriasComponent } from '../categorias/categorias.component';

@Component({
  selector: 'app-categoriaadd',
  templateUrl: './categoriaadd.component.html',
  styleUrls: ['./categoriaadd.component.css']
})
export class CategoriaaddComponent implements OnInit {

  form: FormGroup;
  idCategoria: number=0;
  load: boolean= true;
  constructor(private fb : FormBuilder,private Router: Router, private CategoriaService:
    CategoriaService,private Route : ActivatedRoute,  private toastr: ToastrService, public dialogRef: MatDialogRef<CategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      if(this.data.id>0){
        this.idCategoria = this.data.id;
        this.form = this.fb.group({
          id: this.data.id,
          nombre: new FormControl('',Validators.required),
          descripcion: new FormControl(''),
        })
      }
      else{
        this.form = this.fb.group({
          id: this.data.id,
          nombre: new FormControl('',Validators.required),
          descripcion: new FormControl(''),
        })
      }
    }

  ngOnInit(): void {
    if(this.data.id>0){
      this.load= false;
      this.CategoriaService.getCategoria(this.data.id).subscribe(
        r=>{
          this.load=true;
          this.form.controls['nombre'].setValue(r.data.nombre)
          this.form.controls['descripcion'].setValue(r.data.descripcion)
        }, error => {
          this.load=true;
          this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
        }
      )
    }
  }

  Guardar(){
    
    if(this.data.id>0){
      this.load= false;
      this.CategoriaService.updateCategoria(this.form.value).subscribe
      (
        r=> {
          this.load=true;
          this.Router.navigate(['categorias']);
          this.toastr.success("se edito exitosamente","Editado.")
        },
        error => {
          this.load=true;
          this.toastr.warning("no se edito, revise su conexión","Error.")
        }
      )
    }
    else{
      this.load= false;
      this.CategoriaService.saveCategoria(this.form.value).subscribe
      (
        r=> {
          this.load=true;
          this.Router.navigate(['categorias']);
          this.toastr.success("se guardo exitosamente","Guardado.")
        },
        error => {
          this.load=true;
          this.toastr.warning("no se guardo, revise su conexión","Error.")
        }
      )
    }
  }

}
