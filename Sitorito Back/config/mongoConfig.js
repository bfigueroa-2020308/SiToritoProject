'use strict'

const mongoose =require('mongoose');

exports.init=()=>{
    const uriMongo = 'mongodb+srv://admin:admin@cluster0.fl7gnir.mongodb.net/?retryWrites=true&w=majority';
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error',()=>{
        console.log('ERROR||No se pudo conectar a la base de datos');
        mongoose.disconnect()
    })
    mongoose.connection.on('connecting', ()=>{
        console.log('CONECTANDO||Porfavor espere...')
    });
    mongoose.connection.on('connected',()=>{
        console.log('CONECTADO||Conectado a MongoDB');
    })
    mongoose.connection.once('open',()=>{
        console.log('Conectado a la base de datos!');
    })
    mongoose.connection.on('reconnected',()=>{
        console.log('Reconectado a la base de datos');
    })
    mongoose.connection.once('disconnected',()=>{
        console.log('Desconectado de MongoDB');
    })
    mongoose.connect(uriMongo,{
        maxPoolSize:50,
        useNewUrlParser:true,
        connectTimeoutMS: 3000
    }).catch(err=>console.log(err))
}