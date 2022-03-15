const express = require("express");
const router = express.Router();

const Student = require("../models/students.models");
const crudControlles = require("./crud.controllers")
// const User = require("../models/users.models");
// for student  ........
router.get("", async(req,res)=>{
    try{
        const student = await Student.find().populate({
            path:"userId",
            select:{ firstName:1 , lastName:1,_id:0}
        }) .lean().exec()
        

        return res.status(201).send(student);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});

router.post("", crudControlles(Student).post);


// router.post("", async(req,res)=>{
//     try{
//         const student = await Student.create(req.body).lean().exec();
//         return res.status(201).send(student);
//     }
//     catch(err){
//         return res.status(500).send({massege:err.massege});
//     }
// });

router.get("/:id", async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id).lean().exec();
        return res.status(201).send(student);
    }
    catch(err){
        return res.status(500).send({massege:err.massege});
    }
});
router.patch("/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      return res.status(200).send(student);
    } catch (err) {
      return res.status(500).send({ masseage: err.masseage });
    }
  });
  
  // done....
  router.delete("/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(student);
    } catch (err) {
      return res.status(500).send({ masseage: err.masseage });
    }
  });
  

module.exports =router;