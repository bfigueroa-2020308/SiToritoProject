'use strict'

const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const express = require('express');
const userRoutes = require('../src/routes/user.routes');
const categoriaRoutes = require('../src/routes/categoria.routes');
const mesaRoutes = require('../src/routes/mesa.routes');
const productoRoutes = require('../src/routes/producto.routes');
const reservacionRoutes = require('../src/routes/reservacion.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use('/user',userRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/mesa', mesaRoutes);
app.use('/producto', productoRoutes);
app.use('/reservacion', reservacionRoutes);

module.exports = app;