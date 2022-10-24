const express = require("express");
const router = express.Router();
const { Transactions, Bookings } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

//get total earnings
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

//get individual amounts per place
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

//get schedule dates per renter
router.get("/scheduleofplaces/:id", async (req, res) => {
  const renterId = req.params.id;
  const scheduleofplaces = await Bookings.findAll({
    attributes: ["start_date","end_date", "start_time", "end_time","renter_id", "place_id", "status"],
    where: {
      status: 1,
      renter_id: renterId,
    },
  });

  console.log(scheduleofplaces);
  if (!scheduleofplaces) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(scheduleofplaces);
  }
});

module.exports = router;
