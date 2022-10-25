const express = require("express");
const router = express.Router();
const { Places, Bookings, Occupants } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

router.get("/bookings", async (req, res) => {
  const bookings = await Places.findAll();
  if (!bookings) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.json(bookings);
  }
});

router.get("/booking/:id", async (req, res) => {
  const occupantId = req.params.id;
  const booking = await Bookings.findAll({
    attributes: [
      "start_date",
      "end_date",
      "start_time",
      "end_time",
      "occupant_id",
      "place_id",
      "status",
      "booking_id",
    ],
    where: {
      status: 1,
      occupant_id: occupantId,
    },
  });

  console.log(booking);
  if (!booking) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(booking);
  }
});

router.get("/getoccupantinfo/:id", async (req, res) => {
  const occupantId = req.params.id;
  const occupantinfo = await Occupants.findAll({
    where: {
      UserId: occupantId,
    },
  });

  console.log(occupantinfo);
  if (!occupantinfo) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(occupantinfo);
  }
})

module.exports = router;
