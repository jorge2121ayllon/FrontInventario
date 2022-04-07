import { ReporteclientesComponent } from './components/reportes/reporteclientes/reporteclientes.component';
import { reporteClientes } from './models/reporteClientes';
import { ReporteventasComponent } from './components/reportes/reporteventas/reporteventas.component';
import { CompraaddComponent } from './components/compra/compraadd/compraadd.component';
import { ComprasComponent } from './components/compra/compras/compras.component';
import { CompraeditComponent } from './components/compra/compraedit/compraedit.component';
import { VentasComponent } from './components/venta/ventas/ventas.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { VentaaddComponent } from './components/venta/ventaadd/ventaadd.component';
import { UsuarioaddComponent } from './components/usuarios/usuarioadd/usuarioadd.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component'
import { CategoriaaddComponent} from './components/categorias/categoriaadd/categoriaadd.component';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component'
import { ProductosaddComponent } from './components/productos/productosadd/productosadd.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { StockalertaComponent } from './components/stock/stockalerta/stockalerta.component';
import { StockdetalleComponent } from './components/stock/stockdetalle/stockdetalle.component';
import { PanelayudasComponent } from './components/ayuda/panelayudas/panelayudas.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaeditComponent } from './components/venta/ventaedit/ventaedit.component';

const routes: Routes = [
  {path: 'usuarios' , component: UsuariosComponent},
  {path: 'usuarioadd/:id' , component: UsuarioaddComponent},

  {path: 'categorias' , component: CategoriasComponent},
  {path: 'categoriaadd/:id' , component: CategoriaaddComponent},

  {path: 'productos' , component: ProductosComponent},
  {path: 'stockAlert' , component: StockalertaComponent},
  {path: 'stockDetalle' , component: StockdetalleComponent},
  {path: 'productoadd/:id' , component: ProductosaddComponent},

  {path: 'ventaadd' , component: VentaaddComponent},
  {path: 'ventas' , component: VentasComponent},
  {path: 'ventaedit/:id' , component: VentaeditComponent},
  {path: 'prueba' , component: PruebaComponent},


  {path: 'compraadd' , component: CompraaddComponent},
  {path: 'compras' , component: ComprasComponent},
  {path: 'compraedit/:id' , component: CompraeditComponent},

  {path: 'reporteventas' , component: ReporteventasComponent},
  {path: 'reporteclientes' , component: ReporteclientesComponent},

  {path: 'ayuda' , component: PanelayudasComponent},

  {path: 'login' , component: LoginComponent},
  {path: '**' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'prueba' , component: PruebaComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
