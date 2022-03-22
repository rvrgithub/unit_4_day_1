
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Product = require("../models/product.model")

router.post("/", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send({message : err.message})
    }
 
})

router.get("/", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send({message : err.message})
    }
})

module.exports = router;