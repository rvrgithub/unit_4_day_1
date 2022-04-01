const express = require("express");
const client = require("../configs/redis");
const Product = require("../models/product.models");
const router = express.Router();
router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    // step 1st to add client ..
    const products = await Product.find().lean().exec();
    client.set("products", JSON.stringify(products));
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});
//  updating here
router.get("", async (req, res) => {
  try {
    //   this try is check clien connect face..............
    client.get("products", async function (fetchProducts) {
      if (fetchProducts) {
        const products = JSON.parse(fetchProducts);
        return res.status(201).send({product,redis:false});
      } else {
        try {
            //  this try to check the mongo DB connection..... 
          const products = await Product.find().lean().exec();
          client.set("products", JSON.stringify(products));
          return res.status(201).send({product,redis:false});
        } catch (err) {
            return res.status(500).send({ massege: err.massege });
        }
      }
    });

    const product = await Product.find().lean().exec();
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

router.get("/:id", async (req, res) => {
    try {
        client.get(`products.${req.params.id}`, async function (fetchProducts) {
          if (fetchProducts) {
            const product = JSON.parse(fetchProducts);
            return res.status(201).send(product);
          } else {
            try {
                //  this try to check the mongo DB connection..... 
              const product = await Product.findById(req.params.id).lean().exec();
              client.set(`products.${req.params.id}`, JSON.stringify(product));
              return res.status(201).send({product,redis:false});
            } catch (err) {
                return res.status(500).send({ massege: err.massege });
            }
          }
        });
        const product = await Product.find().lean().exec();
        return res.status(201).send(product);
      } catch (err) {
        return res.status(500).send({ massege: err.massege });
      }
      
      })
  

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.params.id,
      req.body,
      {
        new: true,
      }
    )
      .lean()
      .exec();
      const products = await Product.find().lean().exec();
      client.set(`products.${req.params.id}`,JSON.stringify(product));
      client.set("products",JSON.stringify(products));
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.params.id)
      .lean()
      .exec();
      const products = await Product.find().lean().exec();
client.del(`products.${req.params.id}`);
client.set("products",JSON.stringify(products));
products
    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send({ massege: err.massege });
  }
});

module.exports = router;
