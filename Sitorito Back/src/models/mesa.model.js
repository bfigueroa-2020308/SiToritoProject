'use strict'

const mongoose = require('mongoose');

const mesaSchema ={
    numero : Number,
    ocupada: Boolean,
    tipo : String
}

module.exports = mongoose.model('Mesa', mesaSchema);