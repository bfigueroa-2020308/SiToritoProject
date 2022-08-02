'use strict'

const Mesa = require('../models/mesa.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test = async(req,res)=>{
    try{
        return res.send({message:'El test esta corriendo por el restaurante'});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarMesa = async(req,res)=>{
    try{
        const params = req.body;
        const data = {
            tipo : params.tipo
        }
        const msg = await validateData(data);
        if(!msg){
            if(params.tipo == 'VIP' || params.tipo == 'CLIENT'){
                data.ocupada = false,
                data.numero = await Mesa.count() + 1;
                const mesa = await new Mesa(data);
                mesa.save();
                return res.send({message:'Mesa agregada', mesa});    
            }else{
                return res.status(400).send({message:'Tipo de mesa no valido'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarMesa = async(req,res)=>{
    try{
        const mesaID = req.params.id;
        const mesa = await Mesa.findOne({_id:mesaID});
        if(mesa){
            const mesaEliminada = await Mesa.findOneAndDelete({_id:mesaID});
            if(mesaEliminada){
                return res.send({message:'Mesa eliminada'});
            }else{
                return res.status(400).send({message:'No se pudo eliminar'})
            }
        }else{
            return res.status(404).send({message:'Mesa no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarMesa = async(req,res)=>{
    try{
        const mesaID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check==true){
            const mesaExistente = await Mesa.findOne({_id:mesaID})
            if(mesaExistente){
                if(mesaExistente.numero == params.numero){
                    if(params.tipo){
                        if(params.tipo=='VIP'||params.tipo=='CLIENT'){
                            const mesaActualizada = await Mesa.findOneAndUpdate({_id:mesaID}, params,{new:true});
                            return res.send({message:'Mesa actualizada', mesaActualizada});                                                                         
                        }else{
                            return res.status(400).send({message:'Tipo mesa no valido'});
                        }
                    }else{
                        const mesaActualizada = await Mesa.findOneAndUpdate({_id:mesaID}, params,{new:true});
                        return res.send({message:'Mesa actualizada', mesaActualizada});                                     
                    }
                }else{
                    const existentNumero = await Mesa.findOne({numero:params.numero});
                    if(!existentNumero){
                        if(params.tipo){
                            if(params.tipo=='VIP'||params.tipo=='CLIENT'){
                                const mesaActualizada = await Mesa.findOneAndUpdate({_id:mesaID}, params,{new:true});
                                return res.send({message:'Mesa actualizada', mesaActualizada});                                                                         
                            }else{
                                return res.status(400).send({message:'Tipo mesa no valido'});
                            }
                        }else{
                            const mesaActualizada = await Mesa.findOneAndUpdate({_id:mesaID}, params,{new:true});
                            return res.send({message:'Mesa actualizada', mesaActualizada});                                     
                        }
                    }else{
                        return res.status(400).send({message:'Una mesa ya tiene ese numero'})
                    }
                }
            }else{
                return res.status(404).send({message:'Mesa no encontrada'});
            }
        }else{
            return res.status(400).send({message:'parametros vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarMesas=async(req,res)=>{
    try{
        const mesas = await Mesa.find();
        if(mesas!=[]){
            return res.send({mesas});
        }else{
            return res.status(404).send({message:'Mesas no encontradas'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostarMesasClient = async(req,res)=>{
    try{
        const mesas = await Mesa.find({tipo:'CLIENT'});
        if(mesas!=[]){
            return res.send({mesas});
        }else{
            return res.status(404).send({message:'Mesas no encontradas'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarMesa = async(req,res)=>{
    try{
        const mesaID = req.params.id;
        const mesa = await Mesa.findOne({_id:mesaID});
        if(mesa){
            return res.send({mesa});
        }else{
            return res.status(404).send({message:'Mesa no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}