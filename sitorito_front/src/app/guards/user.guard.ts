import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRestService } from '../services/user/user-rest.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private userRest : UserRestService,
    private router : Router,
  ){

  }
  
  canActivate(){
    if(this.userRest.obtenerIdentidad().role=='ADMIN'||
    this.userRest.obtenerIdentidad().role=='CLIENT'||
    this.userRest.obtenerIdentidad().role=='VIP'){
      return true;
    }else{
      this.router.navigateByUrl('');
      return false;
    }
  }
  
}
