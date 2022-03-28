const express = require("express");
const User = require("../models/user.models");


const router = express.Router();

// api for user post.......
router.post("", async (req,res)=>{
    try{
const user = await User.create(req.body);
return res.status(201).send({user:user});
    }
    catch(err){
        return res.status(401).send(err.message);
    }
})



// data get .................
router.get("", async (req,res)=>{
    try{
const user = await User.find().lean().exec();
return res.status(201).send({user:user});
    }
    catch(err){
        return res.status(401).send(err.message);
    }
})


// fir user id....
// router.get("/:id", async (req,res)=>{
//     try{
// const user = await User.create(req.body);
// return res.status(201).send({user:user});
//     }
//     catch(err){
//         return res.status(401).send(err.message);
//     }
// })


module.exports = router;