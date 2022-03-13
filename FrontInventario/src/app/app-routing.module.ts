import { VentaaddComponent } from './components/venta/ventaadd/ventaadd.component';
import { UsuarioaddComponent } from './components/usuarios/usuarioadd/usuarioadd.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component'
import { CategoriaaddComponent} from './components/categorias/categoriaadd/categoriaadd.component';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component'
import { ProductosaddComponent } from './components/productos/productosadd/productosadd.component'; 
import { ProductosComponent } from './components/productos/productos/productos.component'; 
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'usuarios' , component: UsuariosComponent},
  {path: 'usuarioadd/:id' , component: UsuarioaddComponent},
  {path: 'categorias' , component: CategoriasComponent},
  {path: 'categoriaadd/:id' , component: CategoriaaddComponent},
  {path: 'productos' , component: ProductosComponent},
  {path: 'productoadd/:id' , component: ProductosaddComponent},
  {path: 'ventaadd' , component: VentaaddComponent},


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
