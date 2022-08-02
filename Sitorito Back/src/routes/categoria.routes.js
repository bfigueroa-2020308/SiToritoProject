'use strict'

const express = require('express');
const mdAuth = require('../authorization/authenticate');
const categoriaController = require('../controllers/categoria.controller');
const app = express.Router();

app.get('/test', categoriaController.test);
app.get('/categorias',[mdAuth.ensureAuth], categoriaController.mostrarCategorias);
app.get('/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.mostrarCategoria);
app.post('/agregar', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.agregarCategoria)
app.delete('/eliminar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.eliminarCategoria);
app.put('/actualizar/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], categoriaController.actualizarCategoria);

module.exports=app;