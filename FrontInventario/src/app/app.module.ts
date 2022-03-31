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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
import { MatDialogModule} from '@angular/material/dialog';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { PruebaComponent } from './components/prueba/prueba.component';
import {MatCardModule} from '@angular/material/card';
import { VentasComponent } from './components/venta/ventas/ventas.component';
import { VentaeditComponent } from './components/venta/ventaedit/ventaedit.component';
import { StockdetalleComponent } from './components/stock/stockdetalle/stockdetalle.component';
import { StockalertaComponent } from './components/stock/stockalerta/stockalerta.component';



import { ComprasComponent } from './components/compra/compras/compras.component';
import { CompraaddComponent } from './components/compra/compraadd/compraadd.component';
import { CompraeditComponent } from './components/compra/compraedit/compraedit.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReporteventasComponent } from './components/reportes/reporteventas/reporteventas.component';
import { ProductosDialogComponent } from './components/productos/productos-dialog/productos-dialog.component';

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
    PruebaComponent,
    VentasComponent,
    VentaeditComponent,
    StockdetalleComponent,
    StockalertaComponent,
    ComprasComponent,
    CompraaddComponent,
    CompraeditComponent,
    NavegacionComponent,
    ReporteventasComponent,
    ProductosDialogComponent,
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
    MatAutocompleteModule,
    MatCardModule,
    MatSliderModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatTooltipModule,
    LayoutModule,
    MatSidenavModule,
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
