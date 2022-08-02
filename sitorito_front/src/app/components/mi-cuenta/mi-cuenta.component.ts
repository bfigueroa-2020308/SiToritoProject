import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  user:any
  identity:any
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) {
    this.user ={
      nombre:'',
      apellido:'',
      username:''
    }
    this.identity = this.userRest.obtenerIdentidad();
   }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos(){
    this.user.nombre = this.identity.nombre;
    this.user.apellido = this.identity.apellido;
    this.user.username = this.identity.username;
  }

  actualizarUsuario(form:any){
    this.userRest.actualizarUsuario(this.user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!',res.message,'success');
        localStorage.setItem('identity', JSON.stringify(res.userActualizado));
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
        this.obtenerDatos();
      }
    })
    this.obtenerDatos();
  }
  
  eliminarUsuario(){
    this.userRest.eliminarUsuario().subscribe({
      next:(res:any)=>{
        Swal.fire('Lamentamos verte partir!', res.message, 'success');
        this.router.navigateByUrl('');
        localStorage.clear();
      }, error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
      }
    })
  }

}
