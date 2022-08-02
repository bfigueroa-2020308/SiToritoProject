'use strict'

const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');

const userSchema ={
    nombre : String,
    apellido : String,
    username : String,
    password : String,
    role: String
}

module.exports = mongoose.model('Usuario',userSchema); 

/* 
    ROLES A UTILIZAR:
    Administrador de aplicaion: ADMIN
    usuario comun : CLIENT
    usuario vip : VIP
*/