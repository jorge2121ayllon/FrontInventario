import { TokenInterceptor } from './token.interceptor';
import { AuthGuard } from './auth.guard';
import { LoginService } from './services/login.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion'
//Componentes de material
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { UsuarioaddComponent } from './components/usuarios/usuarioadd/usuarioadd.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component';
import { CategoriaaddComponent } from './components/categorias/categoriaadd/categoriaadd.component';
import { ProductosaddComponent } from './components/productos/productosadd/productosadd.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { VentaaddComponent } from './components/venta/ventaadd/ventaadd.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioaddComponent,
    UsuariosComponent,
    CategoriasComponent,
    CategoriaaddComponent,
    ProductosaddComponent,
    ProductosComponent,
    VentaaddComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,

    MatSliderModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
  ],
  providers: [
    LoginService,
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
