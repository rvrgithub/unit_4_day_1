const express = require("express");
const User = require("../models/user.models");

const { body, validationResult } = require("express-validator");
const router = express.Router();
router.post(
  "/",
  body("first_name")
  .trim()
  .not()
  .isEmpty()
  .isLength({min:3,max:10})
  .withMessage("first_name is required"),
  body("last_name")
  .trim()
  .not()
  .isEmpty()
  .isLength({min:3,max:10})
  .withMessage("last_name is required"),
  body("eamil")
  .isEmail()
  .withMessage("Email is required...."),
  body("pincode")
  .isLength({ min: 6, max: 6 })
  .withMessage("pincode is required..."),
  body("gender").isLength.withMessage("gender is required...."),
  body("age").custom((val)=>{
      if(val>=1 || val<=100){
          throw new Error("Please provide correct age..")
      }
      return true;
  }).withMessage("age is required"),
  async (req, res) => {
    try {
      console.log("");
      const errors = validationResult(req);
      if (!errors.isEmail()) {
        return res.status(500).send({ error: errors.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).send({ user: user });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;


