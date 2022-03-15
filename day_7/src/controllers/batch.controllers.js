const express = require("express");
const router = express.Router();


const Batch = require("../models/batch.models");
const crudControlles = require("./crud.controllers")
// for Batch   ........
router.get(" ", async(req,res)=>{
    try{
        const batch  = await Batch.find().populate({
            path:"userId",
            select:{ firstName:1 , lastName:1,_id:0}
        }) 
        .populate({  
            path:"studentId",
            select:{ roll_id:1 , current_batch:1,_id:0}
        })
        .lean().exec().lean().exec();
        return res.status(201).send(batch );
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});
router.post("", crudControlles(Batch).post);

// router.post(" ", async(req,res)=>{
//     try{
//         const batch  = await Batch.create(req.body).lean().exec();
//         return res.status(201).send(batch );
//     }
//     catch(err){
//         return res.status(500).send({massege:err.massege});
//     }
// });

router.get(" /:id", async(req,res)=>{
    try{
        const batch  = await Batch.findById(req.params.id).lean().exec();
        return res.status(201).send(batch );
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});
router.patch("/:id", async (req, res) => {
    try {
      const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      return res.status(200).send(batch);
    } catch (err) {
      return res.status(500).send({ masseage: err.masseage });
    }
  });
  
  // done....
  router.delete("/:id", async (req, res) => {
    try {
      const batch = await Batch.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(batch);
    } catch (err) {
      return res.status(500).send({ masseage: err.masseage });
    }
  });
module.exports =router;