import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MesaComponent } from './components/mesa/mesa.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { RegisterVIPComponent } from './components/register-vip/register-vip.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoginClienteComponent,
    NavbarComponent,
    ProductoComponent,
    CategoriaComponent,
    MesaComponent,
    FacturasComponent,
    RegisterVIPComponent,
    MiCuentaComponent,
    ReservacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
