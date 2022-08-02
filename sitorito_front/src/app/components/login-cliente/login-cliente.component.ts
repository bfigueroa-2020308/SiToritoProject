import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent implements OnInit {
  user:UserModel
  constructor(
    private UserRest : UserRestService,
    private router : Router
  ) {
    this.user = new UserModel('','','','','');
   }

  ngOnInit(): void {
  }

  login(form:any){
    this.UserRest.login(this.user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!',res.message, 'success');
        localStorage.setItem('identity', JSON.stringify(res.userExist));
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
      },error:(err)=>{
        Swal.fire('Error!', err.error.message || err.error, 'error');
        console.log(err);
      }
    })
  }

}
