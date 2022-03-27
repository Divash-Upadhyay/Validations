const express = require("express");

const { body, validationResult } = require('express-validator');

const User = require("../models/user.model");

const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});


router.post("/",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 3, max: 30 }),
  body("last_name")
    .isLength({ min: 3, max: 30 }),
  body("email")
    .isEmail(),
  body("pincode").isNumeric(),
  body("age").isNumeric()
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("age must be between 1 and 100")
      }
      return true;
    }),
  // body("gender").custom((value) =>{
  //   if(value !== "male" || value !== "female" || value !== "others"){
  //     throw new Error("must be either male,female or others")
  //   }
  //   return true;
  // }),



  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // let newErrors;
        // newErrors = errors.array().map((err) => {
        //   return { key: err.param, message: err.msg };
        // });
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.create(req.body);

      return res.status(201).send(user);
    }
    catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });


module.exports = router;