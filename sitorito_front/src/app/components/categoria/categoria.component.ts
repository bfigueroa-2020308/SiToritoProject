import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaRestService } from 'src/app/services/categoria/categoria-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias:any
  categoria:CategoriaModel
  identity:any
  oneCategoria:CategoriaModel
  constructor(
    private categoriaRest : CategoriaRestService,
    private userRest : UserRestService
  ) { 
    this.categoria = new CategoriaModel('','');
    this.identity = this.userRest.obtenerIdentidad();
    this.oneCategoria = new CategoriaModel('','');
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.categoriaRest.obtenerCategorias().subscribe({
      next:(res:any)=>{
        this.categorias = res.categorias;
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  agregarCategoria(form:any){
    this.categoriaRest.agregarCategoria(this.categoria).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.obtenerCategorias()
        form.reset();
      }, error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error, 'error');
        console.log(err);
      }
    })
  }

  eliminarCategoria(user:any){
    this.categoriaRest.eliminarCategoria(user).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.obtenerCategorias()
      }, error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error, 'error');
        console.log();
      }
    })
  }

  obtenerCategoria(categoria:any){
    this.oneCategoria = categoria;
  }

  actualizarCategoria(form:any){
    this.categoriaRest.actualizarCategoria(this.oneCategoria).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!',res.message,'success');
        this.obtenerCategorias();
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
        this.obtenerCategorias();
      }
    })
  }

}
