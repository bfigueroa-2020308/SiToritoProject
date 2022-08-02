import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservacionRestService {
  httpOptions = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token = globalToken;
    }else{
      token =''
    }
    return token;
  }

  comprarProductos(params:any){
    return this.http.post(environment.baseUri + 'reservacion/comprar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarReservacion(){
    return this.http.delete(environment.baseUri + 'reservacion/eliminar', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerReservacion(){
    return this.http.get(environment.baseUri + 'reservacion/verReservacion',{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

}
