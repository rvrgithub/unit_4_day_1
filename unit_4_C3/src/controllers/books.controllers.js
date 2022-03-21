// const { Router } = require("express");
const express =require("express");
const Book =  require("../models/books.models");
const  router = express.Router();
router.post("",async(req,res)=>{
    const book = await Book.create(req.body);
    return res.status(201).send({book:book});
})
module.exports = router;