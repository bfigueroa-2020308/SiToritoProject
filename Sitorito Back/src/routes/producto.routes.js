'use strict'

const express = require('express');
const productoController = require('../controllers/producto.controller');
const mdAuth = require('../authorization/authenticate');
const app = express.Router();

app.get('/test',  productoController.test);
app.get('/productos',[mdAuth.ensureAuth], productoController.mostrarProductos);
app.get('/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.mostrarProducto);
app.post('/agregar', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.agregarProducto);
app.post('/enviar/:id',[mdAuth.ensureAuth], productoController.enviarProductoReservacion);
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.eliminarProducto);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], productoController.actualizarProducto);

module.exports = app;