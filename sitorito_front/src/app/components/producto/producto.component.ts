import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoRestService } from 'src/app/services/producto/producto-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { CategoriaRestService } from 'src/app/services/categoria/categoria-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  identity:any
  productos:any
  categorias:any
  producto:ProductoModel
  oneProducto:ProductoModel
  oneCategoria:any
  constructor(
    private userRest : UserRestService,
    private productoRest: ProductoRestService,
    private categoriaRest: CategoriaRestService
  ) {
    this.identity = this.userRest.obtenerIdentidad()
    this.producto = new ProductoModel('','',0,0,'');
    this.oneProducto = new ProductoModel('','',0,0,'');
    this.oneCategoria = this.oneProducto.categoria
   }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(){
    this.productoRest.obtenerProductos().subscribe({
      next:(res:any)=>{
        this.productos = res.productos;
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
      }
    })
  }

  obtenerCategorias(){
    this.categoriaRest.obtenerCategorias().subscribe({
      next:(res:any)=>{
        this.categorias = res.categorias
      }, error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error, 'error');
        console.log(err);
      }
    })
  }

  agregarProducto(form:any){
    this.productoRest.agregarProducto(this.producto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.obtenerProductos();
        form.reset();
      }, error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
        form.reset()
      }
    })
  }

  eliminarProducto(producto:any){
    this.productoRest.eliminarProducto(producto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message,'success');
        this.obtenerProductos();
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
      }
    })
  }

  obtenerProducto(producto:any){
    this.oneProducto = producto;
  }

  actualizarProducto(form:any){
    this.productoRest.actualizarProducto(this.oneProducto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.obtenerProductos();
      },error:(err)=>{
        Swal.fire('Error!', err.error.message||err.error,'error');
        console.log(err);
        this.obtenerProductos();
      }
    })
  }

  reservarProducto(form:any){
    this.productoRest.enviarProducto(this.oneProducto,this.producto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo', res.message,'success');
      },error:(err)=>{
        console.log(err);
        Swal.fire('Error!',err.error.message||err.error,'error');
        console.log(err);
      }
    })  
  }
}
