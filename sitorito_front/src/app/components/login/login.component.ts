import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:UserModel
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) { 
    this.user = new UserModel('','','','','');
  }

  ngOnInit(): void {
  }

  login(form:any){
    this.userRest.login(this.user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        localStorage.setItem('identity', JSON.stringify(res.userExist));
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('');
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error, 'error');
        console.log(err);
      }
    })
  }

}
