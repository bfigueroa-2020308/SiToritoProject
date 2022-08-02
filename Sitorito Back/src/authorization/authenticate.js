'use strict'

const jwt = require('jwt-simple');

const TaurusKey='Minotaurus'

exports.ensureAuth=(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message:'La cabecera de autenticacion no existe'})
    }else{
        try{
            let token = req.headers.authorization.replace(/['"]+/g,'');
            var payload = jwt.decode(token,TaurusKey); 
        }catch(err){
            console.log(err);
            return res.status(400).send({message:'El token no es valido o a expirado'})
        }
        req.user = payload;
        next();
    }  
}

exports.isAdmin=(req,res,next)=>{
    try{
        const role = req.user.role;
        if(role==='ADMIN'){
            next();
        }else{
            return res.status(403).send({message:'Usuario no autorizado'});
        }
    }catch(err){
        console.log(err)
        return err;
    }
}