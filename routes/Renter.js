const express = require("express");
const router = express.Router();
const { Transactions } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

//select occupants
router.get("/transactions/:id", async (req, res) => {
  const renterId = req.params.id;
  const transaction = await Transactions.findAll({
    attributes: [
      "renter_id",
      [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
    ],
    group: ["renter_id"],
    where: {
      renter_id: renterId,
    },
  });

  console.log(transaction);
  if (!transaction) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(transaction);
  }
});

router.get("/paymentofplaces/:id", async (req, res) => {
  const renterId = req.params.id;
  const paymentofplaces = await Transactions.findAll({
    attributes: ["renter_id", "amount", "place_id", "rent_date"],
    where: {
      renter_id: renterId,
    },
  });

  console.log(paymentofplaces);
  if (!paymentofplaces) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(paymentofplaces);
  }
});

module.exports = router;
