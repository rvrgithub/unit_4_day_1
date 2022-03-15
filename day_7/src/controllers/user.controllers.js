
const express = require("express");
const router = express.Router();


const User = require("../models/users.models");
const crudControlles = require("./crud.controllers")
 
router.get("", async(req,res)=>{
    try{
        const user = await User.find().lean().exec()
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});

router.post("", crudControlles(User).post);

// router.post("", async(req,res)=>{
//     try{
//         const user = await User.create(req.body).lean().exec();
//         return res.status(201).send(user);
//     }
//     catch(err){
//         return res.status(500).send({massege:err.massege});
//     }
// });

router.get("/:id", async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});
router.patch("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ masseage: err.masseage });
    }
  });
  
  // done....

  router.delete(":/id" ,crudControlles(User).deleteOne);
//   router.delete("/:id", async (req, res) => {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id).lean().exec();
  
//       return res.status(200).send(user);
//     } catch (err) {
//       return res.status(500).send({ masseage: err.masseage });
//     }
//   });
  
  module.exports =router;