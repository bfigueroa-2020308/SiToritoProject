'use strict'

const mongoose = require('mongoose');

const reservacionSchema = {
    fecha : Date,
    stockReservado: Number,
    productos:[{type:mongoose.Schema.ObjectId, ref:'Producto'}],
    mesa:{type:mongoose.Schema.ObjectId, ref:'Mesa'},
    usuario:{type:mongoose.Schema.ObjectId, ref:'Usuario'},
    total: Number
}

module.exports=mongoose.model('Reservacion', reservacionSchema);