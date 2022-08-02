'use strict'

const express = require('express');
const userController = require('../controllers/user.controller');
const app = express.Router();
const mdAuth = require('../authorization/authenticate');

app.get('/test',userController.test);
app.get('/usuarios', [mdAuth.ensureAuth,mdAuth.isAdmin] ,userController.mostrarUsuarios);
app.get('/:id', [mdAuth.ensureAuth, mdAuth.isAdmin] ,userController.mostrarUsuario);
app.post('/agregar', userController.agregarUsuario);
app.post('/agregarVIP',[mdAuth.ensureAuth, mdAuth.isAdmin] ,userController.agregarUsuarioVIP);
app.post('/login', userController.login);
app.delete('/eliminar', [mdAuth.ensureAuth], userController.eliminarUsuario);
app.put('/actualizar', [mdAuth.ensureAuth] ,userController.actualizarUsuraio);

module.exports = app;