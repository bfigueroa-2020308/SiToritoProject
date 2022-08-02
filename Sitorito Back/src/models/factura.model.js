'use strict'

const mongoose = require('mongoose');

const facturaSchema={
    detalles:[]
}

module.exports = mongoose.model('Factura', facturaSchema);