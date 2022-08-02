import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders().set('Content-Type','application/json')
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token = globalToken
    }else{
      token=''
    }
    return token
  }

  obtenerIdentidad(){
    let globalIdentidad = localStorage.getItem('identity');
    let identidad;
    if(globalIdentidad!=undefined){
      identidad = JSON.parse(globalIdentidad);
    }else{
      identidad=''
    }
    return identidad;
  }

  obtenerUsuarios(){
    return this.http.get(environment.baseUri + 'user/usuarios',{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerUsuario(params:any){
    return this.http.get(environment.baseUri + 'user/' +params._id),{headers:this.httpOptions.set('Authorization', this.obtenerToken())};
  }

  agregarUsuario(params:any){
    return this.http.post(environment.baseUri + 'user/agregar',params,{headers:this.httpOptions});
  }

  agregarUsuarioVIP(params:any){
    return this.http.post(environment.baseUri + 'user/agregarVIP', params,{headers:this.httpOptions.set('Authorization',this.obtenerToken())});
  }

  login(params:any){
    return this.http.post(environment.baseUri + 'user/login', params,{headers:this.httpOptions});
  }

  eliminarUsuario(){
    return this.http.delete(environment.baseUri + 'user/eliminar', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarUsuario(params:any){
    return this.http.put(environment.baseUri + 'user/actualizar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});  
  }

}
