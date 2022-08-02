'use strict'

const express = require('express');
const mdAuth = require('../authorization/authenticate');
const reservacionController = require('../controllers/reservacion.controller');
const app = express.Router();

app.get('/test', reservacionController.test);
app.get('/verFacturas',[mdAuth.ensureAuth, mdAuth.isAdmin], reservacionController.verFacturas)
app.get('/verReservacion',[mdAuth.ensureAuth], reservacionController.obtenerReservacion);
app.post('/comprar', [mdAuth.ensureAuth], reservacionController.comprarReservacion);
app.delete('/eliminar', [mdAuth.ensureAuth], reservacionController.eliminarReservacion);

module.exports = app;