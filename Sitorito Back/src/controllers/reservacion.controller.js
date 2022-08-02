'use strict'

const moment = require('moment');
const Factura = require('../models/factura.model');
const Reservacion = require('../models/reservacion.model');
const Mesa = require('../models/mesa.model');
const {validateData} = require('../services/validate');

exports.test = async(req,res)=>{
    try{
        return res.send({message:'El test esta corriendo...por ahi'});
    }catch(err){    
        console.log(err);
        return err;
    }
}

exports.eliminarReservacion = async(req,res)=>{
    try{
        const userID = req.user.sub;
        const existentReservacion = await Reservacion.findOne({usuario:userID});
        if(existentReservacion){
            const reservacionEliminada = await Reservacion.findOneAndDelete({_id:existentReservacion._id});
            if(reservacionEliminada){
                return res.send({message:'Reservacion eliminada satisfactoriamente'});
            }else{
                return res.status(400).send({message:'No se pudo eliminar'});
            }
        }else{
            return res.status(404).send({message:'Reservacion no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.comprarReservacion = async(req,res)=>{
    try{
        const userID = req.user.sub;
        const params = req.body;
        const data = {
            mesa : params.mesa
        }
        const msg = await validateData(data);
        if(!msg){
            const reservacionExistente = await Reservacion.findOne({usuario:userID});
            if(reservacionExistente){
                const mesaExistente = await Mesa.findOne({_id:params.mesa});
                if(mesaExistente.ocupada == false){
                    if(req.user.role =='CLIENT'){
                        const reservacionFinal = await Reservacion.findOneAndUpdate({_id:reservacionExistente._id},{
                            fecha:moment(),
                            mesa: params.mesa
                        },{new:true}).populate('usuario').populate('productos').populate('mesa').lean();
                        const factura = await new Factura({
                            detalles : reservacionFinal
                        })
                        factura.save();
                        await Reservacion.findOneAndDelete({usuario:userID});
                        await Mesa.findOneAndUpdate({_id:params.mesa},{
                            ocupada:true
                        })
                        return res.send({message:'Reservacion comprada', factura});
                    }else{
                        const reservacionFinal = await Reservacion.findOneAndUpdate({_id:reservacionExistente._id},{
                            fecha:moment(),
                            mesa: params.mesa,
                            total: reservacionExistente.total - (reservacionExistente.total*0.10)
                        },{new:true}).populate('usuario').populate('productos').populate('mesa').lean();
                        const factura = await new Factura({
                            detalles : reservacionFinal
                        })
                        factura.save();
                        await Reservacion.findOneAndDelete({usuario:userID});
                        await Mesa.findOneAndUpdate({_id:params.mesa},{
                            ocupada:true
                        })
                        return res.send({message:'Reservacion comprada', factura});
                    }
                }else{
                    return res.status(404).send({message:'Mesa no encontrada o ya ocupada'})
                }
            }else{
                return res.status(404).send({message:'Reservacion no encontrada'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.verFacturas = async(req,res)=>{
    try{
        const facturas = await Facturas.find();
        if(facturas!=[]){
            return res.send({facturas});
        }else{
            return res.status(404).send({message:'Facturas no encontradas'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.obtenerReservacion = async(req,res)=>{
    try{
        const userID = req.user.sub
        const reservacion = await Reservacion.findOne({usuario:userID});
        if(reservacion){
            return res.send({reservacion});
        }else{
            return res.status(404).send({message:'Reservacion no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}