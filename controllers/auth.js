const {request,response}= require('express');
const {validationResult}=require('express-validator');

const createUser=(req=request,res= response)=>{
    const{name,email,password}=req.body;
    
    res.status(201).json({
        ok:true,
        message:'regitro',
        name,
        email,
        password
    });
}

const loginUser=(req=request,res= response)=>{
    const {email,password}=req.body;
    
    res.status(201).json({
        ok:true,
        message:'login',
        email,
        password
    });
}

const revalidateToken=(req=request,res= response)=>{
    res.json({
        ok:true,
        message:'renew'
    });
}


module.exports={
    createUser,
    loginUser,
    revalidateToken
}