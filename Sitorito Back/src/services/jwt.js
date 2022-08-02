'use strict'

const moment = require('moment');
const jwt = require('jwt-simple');

const TaurusKey = 'Minotaurus'

exports.createToken=async(user)=>{
    try{
        const payload={
            sub : user._id,
            nombre : user.nombre,
            apellido: user.apellido,
            username: user.username,
            role: user.role,
            iat: moment().unix(),
            exp: moment().add(2,'hour').unix()
        }
        return jwt.encode(payload,TaurusKey)
    }catch(err){
        console.log(err);
        return err;
    }
}