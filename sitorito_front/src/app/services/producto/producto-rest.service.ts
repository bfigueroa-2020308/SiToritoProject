import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
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

  obtenerProductos(){
    return this.http.get(environment.baseUri + 'producto/productos',{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerProducto(params:any){
    return this.http.get(environment.baseUri + 'producto/' + params._id,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  agregarProducto(params:any){
    return this.http.post(environment.baseUri + 'producto/agregar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  enviarProducto(id:any,params:any){
    return this.http.post(environment.baseUri + 'producto/enviar/' + id._id, params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarProducto(params:any){
    return this.http.delete(environment.baseUri + 'producto/eliminar/' + params._id,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarProducto(params:any){
    return this.http.put(environment.baseUri + 'producto/actualizar/' + params._id, params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

}
