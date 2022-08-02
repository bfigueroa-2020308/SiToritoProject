'use strict'

exports.validateData =(data)=>{
    let keys = Object.keys(data);
    let msg = ''
    for(let key of keys){
        if(data[key]!=null&&data[key]!=undefined&&data[key]!=''){
            continue;
        }else{
            msg += `El parametro ${key} es necesario \n`
        }
    }
    return msg;
}

exports.checkUpdate=(params)=>{
    try{
        if(Object.entries(params).length==0||params.role||params.password){
            return false
        }else{
            return true
        }
    }catch(err){
        console.log(err);
        return err;
    }
}