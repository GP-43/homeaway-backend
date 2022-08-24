const express = require("express");
const router = express.Router();
const { Places } = require("../models");

router.post("/user/addnewrent", async (req, res) => {
  const {
    title,
    quantity,
    price_type,
    address,
    room_category,
    contact_no,
    price,
    city,
    postal_code,
    description,
  } = req.body;
  Places.create({
    title: title,
    quantity: quantity,
    price_type: price_type,
    address: address,
    room_category: room_category,
    contact_no: contact_no,
    price: price,
    city: city,
    postal_code: postal_code,
    description: description,
  });
  res.json("SUCCESS");
});

module.exports = router;
