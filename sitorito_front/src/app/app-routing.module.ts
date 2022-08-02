import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegisterVIPComponent } from './components/register-vip/register-vip.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'login', component:LoginClienteComponent},
  {path:'loginVIP', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'registerVIP',canActivate:[UserGuard] , component:RegisterVIPComponent},
  {path:'mesas', canActivate:[UserGuard],component:MesaComponent},
  {path:'productos', canActivate:[UserGuard],component:ProductoComponent},
  {path:'miCuenta', canActivate:[UserGuard],component:MiCuentaComponent},
  {path:'reservacion', canActivate:[UserGuard],component:ReservacionComponent},
  {path:'categorias', canActivate:[UserGuard],component:CategoriaComponent},
  {path:'facturas', canActivate:[UserGuard],component:FacturasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
