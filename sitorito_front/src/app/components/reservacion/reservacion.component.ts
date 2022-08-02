import { Component, OnInit } from '@angular/core';
import { ReservacionModel } from 'src/app/models/reservacion.model';
import { ReservacionRestService } from 'src/app/services/reservacion/reservacion-rest.service';
import { MesaRestService } from 'src/app/services/mesa/mesa-rest.service';
import { Router } from '@angular/router';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {
  reservacion:any
  mesas:any
  identity:any
  comprar:any
  constructor(
    private userRest :UserRestService,
    private reservacionRest:ReservacionRestService,
    private mesaRest:MesaRestService,
    private router :Router
  ) { 
    this.identity = this.userRest.obtenerIdentidad();
    this.comprar ={
      mesa:''
    }
  }

  ngOnInit(): void {
    this.obtenerReservacion();
    this.obtenerMesas();
  }

  obtenerMesas(){
    if(this.identity.role!='CLIENT'){
      this.mesaRest.obtenerMesas().subscribe({
        next:(res:any)=>{
          this.mesas = res.mesas;
        },error:(err)=>{
          Swal.fire('Error!', err.error.message||err.error,'error');
          console.log(err);
        }
      })
    }else{
      this.mesaRest.obtenerMesasCliente().subscribe({
        next:(res:any)=>{
          this.mesas = res.mesas;
        }, error:(err)=>{
          Swal.fire('Error!', err.error.message||err.error,'error');
          console.log(err);
        }
      })
    }
  }

  obtenerReservacion(){
    this.reservacionRest.obtenerReservacion().subscribe({
      next:(res:any)=>{
        this.reservacion = res.reservacion;
        console.log(this.reservacion);
      },error:(err)=>{
        Swal.fire('Aun nada? Reserva algo!', err.error.message||err.error,'question');
        this.router.navigateByUrl('/productos')
      }
    })
  }

  comprarReservacion(form:any){
    this.reservacionRest.comprarProductos(this.comprar).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.router.navigateByUrl('/productos');
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
      }
    })
  }

  eliminarReservacion(){
    this.reservacionRest.eliminarReservacion().subscribe({
      next:(res:any)=>{
        Swal.fire('Esperemos solo te equivocaste de producto', res.message,'success');
        this.router.navigateByUrl('/productos');
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
      }
    })
  }

}
