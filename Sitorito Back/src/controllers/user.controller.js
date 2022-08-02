'use strict'

const User = require('../models/user.model');
const jwt = require('../services/jwt');
const bcrypt = require('bcrypt-nodejs');
const {validateData, checkUpdate} = require('../services/validate');

exports.test= async(req,res)=>{
    try{
        return res.send({message:'Test corriendo por el parque'});
    }catch(err){
        console.log(err);
    }
}

//CREACION DE ADMIN

exports.crearAdmin = async(req,res)=>{
    try{
        const adminExistente = await User.findOne({role:'ADMIN'});
        if(!adminExistente){
            const admin = await new User({
                nombre: 'Toro',
                apellido: 'Admin',
                username: 'TAdmin',
                password: bcrypt.hashSync('TOROADMIN'),
                role:'ADMIN'
            })
            admin.save();
        }else{
            console.log({message:'ADMIN ya existente'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

this.crearAdmin();

//CRUD

exports.agregarUsuario=async(req,res)=>{
    try{   
        const params = req.body;
        const data ={
            nombre:params.nombre,
            apellido:params.apellido,
            username:params.username,
            password:params.password,
            role: 'CLIENT'
        }
        const msg = await validateData(data);
        if(!msg){
            const existingUser = await User.findOne({username:params.username});
            if(!existingUser){
                data.password = bcrypt.hashSync(data.password);
                const user = await new User(data);
                user.save();
                return res.send({message:'Usuario agregado satisfactoriamente'});
            }else{
                return res.status(400).send({message:`El nombre de usuario ${params.username}, ya esta en uso, elije otro`});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarUsuarioVIP=async(req,res)=>{
    try{   
        const params = req.body;
        const data ={
            nombre:params.nombre,
            apellido:params.apellido,
            username:params.username,
            password:params.password,
            role: 'VIP'
        }
        const msg = await validateData(data);
        if(!msg){
            const existingUser = await User.findOne({username:params.username});
            if(!existingUser){
                data.password = bcrypt.hashSync(data.password);
                const user = await new User(data);
                user.save();
                return res.send({message:'Usuario agregado satisfactoriamente'});
            }else{
                return res.status(400).send({message:`El nombre de usuario ${params.username}, ya esta en uso, elije otro`});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarUsuario=async(req,res)=>{
    try{
        const userID =req.user.sub
        const existingUser= await User.findOne({_id:userID});
        if(existingUser){
            if(existingUser.role!='ADMIN'){
                const usuarioEliminado = await User.findOneAndDelete({_id:userID});
                if(usuarioEliminado){
                    return res.send({message:'Usuario eliminado satisfactoriamente'});
                }else{
                    return res.status(400).send({message:'No se pudo eliminar este usuario'});
                }
            }else{
                return res.status(403).send({message:'Este usuario no puede ser eliminado'});
            }
        }else{
            return res.status(404).send({message:'Usuario no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarUsuraio = async(req,res)=>{
    try{
        const userID = req.user.sub
        const params = req.body;
        const check = await checkUpdate(params);
        if(check===true){
            const userExist = await User.findOne({_id:userID});
            if(userExist){
                if(userExist.username === params.username){
                    const userActualizado = await User.findOneAndUpdate({_id:userID}, params,{new:true});
                    return res.send({message:'Usuario actualizado', userActualizado});
                }else{
                    const alreadyName = await User.findOne({username:params.username})
                    if(!alreadyName){
                        const userActualizado = await User.findOneAndUpdate({_id:userID}, params,{new:true});
                        return res.send({message:'Usuario actualizado', userActualizado});
                    }else{
                        return res.status(400).send({message:`El nombre de usuario ${params.username} ya esta en uso`});
                    }
                }
            }else{
                return res.status(404).send({message:'Usuario no encontrado'});
            }
        }else{
            return res.status(400).send({message:'Los params vienen vacios o no actualizables'})
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarUsuarios = async(req,res)=>{
    try{
        const usuarios = await User.find();
        if(usuarios!=[]){
            return res.send({usuarios});
        }else{
            return res.status(404).send({message:'Usuarios no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarUsuario = async(req,res)=>{
    try{
        const userID = req.params.id;
        const usuario = await User.findOne({_id:userID});
        if(usuario){
            return res.send({usuario});
        }else{
            return res.status(404).send({message:'Usuario no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.login = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            username : params.username,
            password : params.password
        }
        const msg = await validateData(data);
        if(!msg){
            const userExist = await User.findOne({username:params.username});      
            if(userExist){
                const siEsPassword = bcrypt.compareSync(params.password, userExist.password);
                if(siEsPassword==true){
                    const token = await jwt.createToken(userExist);
                    return res.send({message:'Logeado existosamente', token, userExist});
                }else{
                    return res.status(400).send({message:'Credenciales invalidas'});
                }
            }else{
                return res.status(404).send({message:'Usuario Inexistente'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}