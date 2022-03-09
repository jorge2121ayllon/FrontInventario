import { UsuarioaddComponent } from './components/usuarios/usuarioadd/usuarioadd.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component'
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'usuarios' , component: UsuariosComponent},
  {path: 'usuarioadd/:id' , component: UsuarioaddComponent},

  {path: 'login' , component: LoginComponent},

  {path: '**' , component: HomeComponent},
  {path: 'home' , component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
