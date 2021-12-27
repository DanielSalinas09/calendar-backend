const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validateJWT=(req=request,res=response,next)=>{

    //como voy a recibir el jwt
    //"key":"x-access-token"
    const token = req.header('x-access-token');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            message:'No hay token en la peticion'
        })
    }
    try {

        const payload=jwt.verify(token,process.env.SECRET_JWT_SEED);
        req.uid=payload.uid;
        req.name=payload.name

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            message:'Token no valido'
        })
    }


    next()



}
module.exports={
    validateJWT
}