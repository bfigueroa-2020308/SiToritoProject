import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:UserModel
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) { 
    this.user = new UserModel('','','','','');
  }

  ngOnInit(): void {
  }

  register(form:any){
    this.userRest.agregarUsuario(this.user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.router.navigateByUrl('/login');
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
      }
    })
  }

}
