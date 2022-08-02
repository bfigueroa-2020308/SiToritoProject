'use strict'

const Categoria = require('../models/categoria.model');
const {validateData, checkUpdate} = require('../services/validate');

exports.test=async(req,res)=>{
    try{
        return res.send({message:'Test corriendo por el campo'});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.agregarCategoria = async(req,res)=>{
    try{
        const params = req.body;
        const data ={
            nombre : params.nombre,
            descripcion : params.descripcion
        }
        const msg = await validateData(data);
        if(!msg){
            const alreadyName = await Categoria.findOne({nombre:params.nombre});
            if(!alreadyName){
                const categoria = await new Categoria(data);
                categoria.save();
                return res.send({message:'Categoria agregada', categoria});
            }else{
                return res.status(400).send({message:`El nombre de usuario ${params.nombre} ya esta en uso`})
            }
        }else{
            return res.status(400).send(msg);
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.eliminarCategoria =async(req,res)=>{
    try{
        const categoriaID = req.params.id;
        const categoria = await Categoria.findOne({_id:categoriaID});
        if(categoria){
            const categoriaEliminada = await Categoria.findOneAndDelete({_id:categoriaID});
            if(categoriaEliminada){
                return res.send({message:'Categoria eliminada'});
            }else{
                return res.status(400).send({message:'No se pudo eliminar la categoria'});
            }
        }else{
            return res.status(404).send({message:'Categoria no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.actualizarCategoria = async(req,res)=>{
    try{
        const categoriaID = req.params.id;
        const params = req.body;
        const check = await checkUpdate(params);
        if(check==true){
            const categoriaExistente = await Categoria.findOne({_id:categoriaID});
            if(categoriaExistente){
                if(categoriaExistente.nombre === params.nombre){
                    const categoriaActualizada = await Categoria.findOneAndUpdate({_id:categoriaID},params,{new:true});
                    return res.send({message:'Categoria actualizada', categoriaActualizada});
                }else{
                    const alreadyName = await Categoria.findOne({nombre:params.nombre});
                    if(!alreadyName){
                        const categoriaActualizada = await Categoria.findOneAndUpdate({_id:categoriaID},params,{new:true});
                        return res.send({message:'Categoria actualizada', categoriaActualizada});
                    }else{
                        return res.status(400).send({message:`El nombre ${params.nombre} ya esta en uso`});
                    }
                }
            }else{
                return res.status(404).send({message:'Categoria no encontrada'});
            }
        }else{
            return res.status(400).send({message:'Parametros vacios'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarCategorias = async(req,res)=>{
    try{
        const categorias = await Categoria.find();
        if(categorias !=[]){
            return res.send({categorias});
        }else{
            return res.status(404).send({message:'Categorias no encontradas'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.mostrarCategoria = async(req,res)=>{
    try{
        const categoriaID = req.params.id;
        const categoria = await Categoria.findOne({_id:categoriaID});
        if(categoria){
            return res.send({categoria});
        }else{
            return res.status(404).send({message:'Categoria no encontrada'});
        }
    }catch(err){
        console.log(err);
        return err;
    }
}