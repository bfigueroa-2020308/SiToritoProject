import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  identity : any
  token : any
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) { 
    this.identity = userRest.obtenerIdentidad();
    this.token = userRest.obtenerToken();
  }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
