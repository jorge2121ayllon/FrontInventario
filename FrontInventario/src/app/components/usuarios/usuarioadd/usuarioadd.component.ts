import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarioadd',
  templateUrl: './usuarioadd.component.html',
  styleUrls: ['./usuarioadd.component.css']
})
export class UsuarioaddComponent implements OnInit {

  form: FormGroup;
  idUsuario: number=0;
  load: boolean= true;
  constructor(private fb : FormBuilder,private Router: Router, private UsuarioService:
    UsuarioService,private Route : ActivatedRoute,  private toastr: ToastrService)
  {
    if(this.Route.snapshot.params.id>0)
    {
      this.idUsuario=this.Route.snapshot.params.id;
      this.form = this.fb.group({
        id: this.Route.snapshot.params.id,
        usuario: new FormControl('',[Validators.required,Validators.minLength(5)]),
        role: new FormControl('',Validators.required),
        password:  new FormControl(''),
        gmail:  new FormControl(''),
      })
    }
    else{
      this.form = this.fb.group({
        id: this.Route.snapshot.params.id,
        usuario: new FormControl('',[Validators.required,Validators.minLength(5)]),
        role: new FormControl('',Validators.required),
        password:  new FormControl('',[Validators.required,Validators.minLength(6)]),
        gmail:  new FormControl(''),
      })
    }
  }

  ngOnInit(): void {
    if(this.Route.snapshot.params.id>0)
    {
      this.load= false;
      this.UsuarioService.getUser(this.Route.snapshot.params.id).subscribe(
        r=>{
          this.load=true;
          this.form.controls['usuario'].setValue(r.data.usuario)
          this.form.controls['role'].setValue(r.data.role)
          this.form.controls['gmail'].setValue(r.data.gmail)
        }, error => {
          this.load=true;
          this.toastr.warning("Por favor verifique su conexión a Internet","Error.")
        }
      )
    }
  }
  Guardar()
  {

    if(this.Route.snapshot.params.id>0)
    {
      this.load= false;
      this.UsuarioService.updateUser(this.form.value).subscribe
      (
        r=> {
          
          this.load=true;
          this.Router.navigate(['usuarios']);
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
      this.UsuarioService.saveUser(this.form.value).subscribe
      (
        r=> {
          this.load=true;
          this.Router.navigate(['usuarios']);
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
