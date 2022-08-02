'use strict'

const express = require('express');
const mdAuth = require('../authorization/authenticate');
const mesaController = require('../controllers/mesa.controller');
const app = express.Router();

app.get('/test',  mesaController.test);
app.get('/mesas', [mdAuth.ensureAuth], mesaController.mostrarMesas);
app.get('/mesasCliente',[mdAuth.ensureAuth], mesaController.mostarMesasClient);
app.get('/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], mesaController.mostrarMesa);
app.post('/agregar', [mdAuth.ensureAuth, mdAuth.isAdmin], mesaController.agregarMesa);
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], mesaController.eliminarMesa);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], mesaController.actualizarMesa);

module.exports = app;