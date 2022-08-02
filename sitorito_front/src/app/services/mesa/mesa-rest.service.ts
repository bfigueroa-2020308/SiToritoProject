import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaRestService {
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
      token=''
    }
    return token;
  }

  obtenerMesas(){
    return this.http.get(environment.baseUri + 'mesa/mesas',{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerMesa(params:any){
    return this.http.get(environment.baseUri + 'mesa/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerMesasCliente(){
    return this.http.get(environment.baseUri + 'mesa/mesasCliente', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  agregarMesa(params:any){
    return this.http.post(environment.baseUri + 'mesa/agregar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarMesa(params:any){
    return this.http.delete(environment.baseUri + 'mesa/eliminar/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarMesa(params:any){
    return this.http.put(environment.baseUri + 'mesa/actualizar/' + params._id, params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

}
