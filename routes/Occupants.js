const express = require('express');
const router = express.Router();
const {Occupants} = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
   const {email, name, contact, location, password} = req.body;
   bcrypt.hash(password, 10).then((hash) => {
      Occupants.create({
         email: email,
         name: name,
         contact: contact,
         location: location,
         password: hash,
      });
      res.json("SUCCESS");
   });
});

module.exports = router;