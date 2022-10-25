const express = require("express");
const router = express.Router();
const { Transactions, Bookings, Occupants, Places, Renters } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

router.post("/addrenter", async (req, res) = {
  Renters.create({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
}).then((res) => {
  console.log(res);
  return res.status(201).send("record created");
})
.catch((err) => {
  console.log(err);
  return res.status(501).send("something went wrong");
});
})

router.get("/myrentings/:id", async (req, res) => {
  const renterId = req.params.id;
  const myrentings = await Places.findAll({
    where: {
      renter_id: renterId,
    },
  }
  );
  if (!myrentings) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.json(myrentings);
  }
});

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
    attributes: [
      "start_date",
      "end_date",
      "start_time",
      "end_time",
      "renter_id",
      "place_id",
      "status",
    ],
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

//get user role
router.get("/getuserrole/:id", async (req, res) => {
  const userId = req.params.id;
  const getuserrole = await Occupants.findAll({
    attributes: [
      "role",
    ],
    where: {
      id: userId,
    },
  });

  console.log(getuserrole);
  if (!getuserrole) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(getuserrole);
  }
});

module.exports = router;
