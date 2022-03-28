const express  =  require("express");
const User = require("../models/");
var jwt = require('jsonwebtoken');
const gererateToken = (user)=>{
    console.log(process.env.SECRET_KEY)
        return jwt.sign({user},process.env.SECRET_KEY);
    }

require("dotenv").config();


const register = async(req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email});

        if(user){
            return res.status(500).send({message:"email is already exsits"})
        }
      user  = await User.create(req.body);
      const token = gererateToken(user);
return res.status(201).send({user,token})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


const login = async(req,res)=>{
    try{
        const user =await User.findOne({email:req.body.email});
    
       if(!user){
           return res.status(500).send("Wrong Email or Password");
       }

    const match =user.checkPassword(req.body.password);
    if(!match){
        return res.status(500).send({message:"Wrong Email or Password"})
    }

    const token = gererateToken(user);
    return res.status(201).send({user,token})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}



module.exports ={register,login};