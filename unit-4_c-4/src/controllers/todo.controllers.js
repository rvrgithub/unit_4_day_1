const express = require("express");
const Todo = require("../models/todo.models");

const router = express.Router();

// api for todo post.......
router.post("", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

// data get .................
router.get("", async (req, res) => {
  try {
    const todo = await Todo.find().lean().exec();
    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

// for todo id....
router.get("/:id", async (req,res)=>{
    try{
const todo = await todo.findById(req.params.id).lean().exec();
return res.status(201).send({todo:todo});
    }
    catch(err){
        return res.status(401).send(err.message);
    }
})

// /updating part

router.patch("/:id", async (req, res) => {
  try {
    const todo = await todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).send({ todo: todo });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});


// deleteing part

router.delete("/:id", async (req, res) => {
    try {
      const todo = await todo.deleteById(req.params.id);
      return res.status(201).send({ todo: todo });
    } catch (err) {
      return res.status(401).send(err.message);
    }
  });


module.exports = router;
