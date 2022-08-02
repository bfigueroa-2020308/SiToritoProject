'use strict'

const moment = require('moment');
const Producto = require('../models/producto.model');
const Categoria = require('../models/categoria.model');
const Reservacion = require('../models/reservacion.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test = async(req,res)=>{
    try{
        return res.send({message:'Test corriendo por la piscina'});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarProducto=async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre:params.nombre,
            descripcion:params.descripcion,
            precio:params.precio,
            stock : params.stock,
            categoria:params.categoria
        }
        const msg = await validateData(data);
        if(!msg){
            const categoriaExistente = await Categoria.findOne({_id:params.categoria});
            if(categoriaExistente){
                const productoNombre = await Producto.findOne({nombre:params.nombre});
                if(!productoNombre){
                    const producto = await new Producto(data);
                    producto.save();
                    return res.send({message:'Producto agregado', producto});
                }else{
                    return res.status(400).send({message:`El nombre de producto ${params.nombre} ya esta en uso`});
                }
            }else{
                return res.status(400).send({message:'Categoria no encontrada'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarProducto = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const producto = await Producto.findOne({_id:productoID});
        if(producto){
            const productoEliminado = await Producto.findOneAndDelete({_id:productoID});
            if(productoEliminado){
                return res.send({message:'Producto eliminado'});
            }else{
                return res.status(400).send({message:'No se pudo eliminar'});
            }
        }else{
            return res.status(404).send({message:'Producto no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarProducto =async(req,res)=>{
    try{
        const productoID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check==true){
            const productoExistente = await Producto.findOne({_id:productoID});
            if(productoExistente){
                if(productoExistente.nombre == params.nombre){
                    if(params.categoria){
                        const categoriaExistente = await Categoria.findOne({_id:params.categoria});
                        if(categoriaExistente){
                            const productoActualizado = await Producto.findOneAndUpdate({_id:productoID},params,{new:true}).populate('categoria').lean();
                            return res.send({message:'Producto actualizado', productoActualizado})
                        }else{
                            return res.status(404).send({message:'Categoria no encontrada'});
                        }
                    }else{
                        const productoActualizado = await Producto.findOneAndUpdate({_id:productoID},params,{new:true}).populate('categoria').lean();
                        return res.send({message:'Producto actualizado', productoActualizado});
                    }
                }else{
                    const productoNombre = await Producto.findOne({nombre:params.nombre});
                    if(!productoNombre){
                        if(params.categoria){
                            const categoriaExistente = await Categoria.findOne({_id:params.categoria});
                            if(categoriaExistente){
                                const productoActualizado = await Producto.findOneAndUpdate({_id:productoID},params,{new:true}).populate('categoria').lean();
                                return res.send({message:'Producto actualizado', productoActualizado})
                            }else{
                                return res.status(404).send({message:'Categoria no encontrada'});
                            }
                        }else{
                            const productoActualizado = await Producto.findOneAndUpdate({_id:productoID},params,{new:true}).populate('categoria').lean();
                            return res.send({message:'Producto actualizado', productoActualizado});
                        }
                    }else{
                        return res.status(400).send({message:`El nombre ${params.nombre} ya esta en uso`});
                    }
                }
            }else{
                return res.status(404).send({message:'Producto no encontrado'});
            }
        }else{
            return res.status(400).send({message:'Parametros vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarProductos = async(req,res)=>{
    try{
        const productos = await Producto.find().populate('categoria').lean();
        if(productos!=[]){
            return res.send({productos});
        }else{
            return res.status(404).send({message:'Productos no encontrados'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarProducto = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const producto = await Producto.findOne({_id:productoID}).populate('categoria').lean();
        if(producto){
            return res.send({producto});
        }else{
            return res.status(404).send({message:'Producto no encontrado'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.enviarProductoReservacion = async(req,res)=>{
    try{
        const productoID = req.params.id;
        const userID = req.user.sub;
        const params = req.body;
        const data ={
            stock : params.stock
        }
        const msg = await validateData(data);
        if(!msg){
            if(params.stock > 0){
                const productoExistente = await Producto.findOne({_id:productoID});
                if(productoExistente){
                    if(productoExistente.stock>=params.stock){
                        const existentReservacion = await Reservacion.findOne({usuario:userID});
                        if(existentReservacion){
                            const reservacion = await Reservacion.findOneAndUpdate({usuario:userID},{
                                stockReservado: existentReservacion.stockReservado*1 + params.stock*1,
                                $push:{
                                    productos:productoID
                                },
                                total: existentReservacion.total + (params.stock * productoExistente.precio)
                            },{new:true}).populate('usuario').populate('productos').lean();
                            await Producto.findOneAndUpdate({_id:productoID},{
                                stock : productoExistente.stock - params.stock
                            })
                            return res.send({message:'Se agrego el producto', reservacion});
                        }else{
                            const reservacion = await new Reservacion({
                                stockReservado: params.stock,
                                productos : productoID,
                                usuario: userID,
                                total: (productoExistente.precio * params.stock)
                            })
                            reservacion.save();
                            await Producto.findOneAndUpdate({_id:productoID},{
                                stock : productoExistente.stock - params.stock
                            })
                            return res.send({message:'El producto ha sido reservado', reservacion});
                        }
                    }
                        return res.status(400).send({message:'Oops! parece que no tenemos suficiente stock'});
                }else{
                    return res.status(404).send({message:'El producto no fue encontrado'});
                }
            }else{
                return res.status(400).send({message:'El stock no puede ser 0 o menor que 0'});
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}