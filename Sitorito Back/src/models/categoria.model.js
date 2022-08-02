'use strict'

const mongoose = require('mongoose');

const categoriaSchema = {
    nombre : String,
    descripcion : String
}

module.exports = mongoose.model('Categoria', categoriaSchema);