import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  load: boolean= true;

  constructor(private fb : FormBuilder,private LoginService : LoginService ,private Router: Router,  private toastr: ToastrService
    )
  {
    this.form = this.fb.group({
      User: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar()
  {
    this.load=false;
    this.LoginService.LoginUser(this.form.value)
    .subscribe(
      response => {
        console.log(response as any)
        localStorage.setItem('Token', (response as any).token);
        localStorage.setItem('Usuario', (response as any).usuario);
        localStorage.setItem('Role', (response as any).role);
        this.toastr.success("Logeado exitosamente.")
        this.Router.navigate(['/home']);
      },
      error => {
        this.toastr.warning("Porfavor verifique los datos ingresados en password y gmail","Error de login.")
      });
      this.load=true;
  }

}
