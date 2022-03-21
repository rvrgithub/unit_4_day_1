const { Router } = require("express");
const express = require("express");
const User = require("../models/users.models");
const Book = require("../models/books.models");
const router = express.Router();
router.post(
  "",
  body("firstName")
    .not().isEmpty()
    .withMesage("upto 3 to 30")
    .isLength({ min: 3, max: 30 })
    ,  body("age")
    .not().isEmpty()
    .withMesage()
 .coustom((value)=>{
     if(value <0 || value>151){
         throw new Error("incorect age")
     }
    }),
    
  async (req, res) => {
    const uers = await User.create(req.body);
    const book =await Book.create(req.body);
    return res.status(201).send({ user: user });
  }
);
module.exports = router;
