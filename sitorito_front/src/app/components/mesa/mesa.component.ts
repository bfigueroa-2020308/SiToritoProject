import { Component, OnInit } from '@angular/core';
import { MesaModel } from 'src/app/models/mesa.model';
import { MesaRestService } from 'src/app/services/mesa/mesa-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  identity:any
  mesas:any
  mesa:MesaModel
  oneMesa:MesaModel
  constructor(
    private userRest: UserRestService,
    private mesaRest: MesaRestService
  ) { 
    this.identity = this.userRest.obtenerIdentidad();
    this.mesa = new MesaModel(0,false,'');
    this.oneMesa = new MesaModel(0,false,'');
  }

  ngOnInit(): void {
    this.obtenerMesas()
  }

  obtenerMesas(){
    if(this.identity.role!='CLIENT'){
      this.mesaRest.obtenerMesas().subscribe({
        next:(res:any)=>{
          this.mesas = res.mesas;
        },error:(err)=>{
          console.log(err);
          Swal.fire('Error', err.error.message||err.error,'error');
        }
      })
    }else{
      this.mesaRest.obtenerMesasCliente().subscribe({
        next:(res:any)=>{
          this.mesas = res.mesas;
        }, error:(err)=>{
          console.log(err);
          Swal.fire('Error!', err.error.message||err.error,'error');
        }
      })
    }
  }

  agregarMesa(form:any){
    this.mesaRest.agregarMesa(this.mesa).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.obtenerMesas();
        form.reset();
      }, error:(err)=>{
        console.log(err);
        Swal.fire('Error', err.error.message||err.error,'error');
      }
    })
  }

  eliminarMesa(mesa:any){
    this.mesaRest.eliminarMesa(mesa).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.obtenerMesas();
      },error:(err)=>{
        console.log(err);
        Swal.fire('Error!', err.error.message||err.error, 'error');
      }
    })
  }

  obtenerMesa(mesa:any){
    this.oneMesa = mesa;
  }

  actualizarMesa(form:any){
    this.mesaRest.actualizarMesa(this.oneMesa).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.obtenerMesas();
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
        this.obtenerMesas();
      }
    })
  }

}
