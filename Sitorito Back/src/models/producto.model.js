'use strict'

const mongoose = require('mongoose');

const productoSchema ={
    nombre : String,
    descripcion : String,
    stock: Number,
    precio: Number,
    categoria : {type:mongoose.Schema.ObjectId, ref:'Categoria'}
}

module.exports = mongoose.model('Producto', productoSchema);