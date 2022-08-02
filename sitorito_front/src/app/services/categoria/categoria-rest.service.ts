import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRestService {
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
      token=''
    }
    return token;
  }

  obtenerCategorias(){
    return this.http.get(environment.baseUri + 'categoria/categorias', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerCategoria(params:any){
    return this.http.get(environment.baseUri + 'categoria/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  agregarCategoria(params:any){
    return this.http.post(environment.baseUri + 'categoria/agregar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarCategoria(params:any){
    return this.http.delete(environment.baseUri + 'categoria/eliminar/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarCategoria(params:any){
    return this.http.put(environment.baseUri+'categoria/actualizar/'+params._id, params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

}
