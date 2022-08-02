import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-vip',
  templateUrl: './register-vip.component.html',
  styleUrls: ['./register-vip.component.css']
})
export class RegisterVIPComponent implements OnInit {
  user : UserModel
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) { 
    this.user = new UserModel('','','','','')
  }

  ngOnInit(): void {
  }

  register(form:any){
    this.userRest.agregarUsuarioVIP(this.user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!',res.message,'success');
      },error:(err)=>{
        Swal.fire('Error', err.error.message||err.error);
        console.log(err);
      }
    })
  }
}
