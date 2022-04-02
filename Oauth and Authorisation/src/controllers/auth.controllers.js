const User = require("../models/users.model");
var jwt =require("jsonwebtoken");
require("dotenv").config()
const gererateToken = (user)=>{
console.log(process.env.SECRET_KEY)
    return jwt.sign({user},process.env.SECRET_KEY);
}


const register =async (req,res)=>{
    try{
      let user = await User.findOne({email:req.body.email});
        // check the email are exists 
        if(user){
            return res.status(500).send({message:"email is already exsits"})
        }

        // if user have no acount.. then it create acount
      user  = await User.create(req.body);
      const token = gererateToken(user);
return res.status(201).send({user,token})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


// done this part////


// login Part................
const login = async(req,res)=>{
    try{
        const user =await User.findOne({email:req.body.email});
        // check if mail exists
       if(!user){
           return res.status(500).send("Wrong Email or Password");
       }
    //    if exist and check password
    const match =user.checkPassword(req.body.password);
    // if it doesn't match
    if(!match){
        return res.status(500).send({message:"Wrong Email or Password"})
    }
    // if it match
    const token = gererateToken(user);
    return res.status(201).send({user,token})
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}
module.exports ={register,login,gererateToken};