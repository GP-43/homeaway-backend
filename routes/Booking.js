const express = require("express");
const router = express.Router();
const { Transactions, Bookings, Occupants, Places, Renters } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

router.post("/cancelbooking/:id", async (req, res) => {

  const renterId = req.params.id;
  const details = req.body;

  const cancelbooking = await Bookings.update(
    {
      status:details.changestatus,
    },
    {
      where: { renter_id: renterId },
    }
  );

  if (!cancelbooking) {
      res.json({ state: 0, error: "Complaint doesn't exist" });
  } else {
      res.json(cancelbooking)
  }

});


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

module.exports = router;
