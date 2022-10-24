const express = require("express");
const router = express.Router();
const { Transactions } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize")

//select occupants
router.get("/transactions", async (req, res) => {
  // try {
  //   const transaction = await db.Transactions.findOne({
  //     attributes:['renter_id', [sequelize.fn("SUM", sequelize.col("amount"))]],
  //     group: ['renter_id'],
  //     raw: true
  //   });
  //   res.send(transaction);
  // } catch (err) {
  //   res.send(err);
  // }
  const transaction = await Transactions.findAll({
      attributes: [
        'renter_id',
        [sequelize.fn("SUM", sequelize.col('amount')), 'total_amount'],
      ],
      group: ['renter_id'],
    });

  // const transaction = await Transactions.findAll({
  //   attributes: ["renter_id", "amount"],
  //   group: ["renter_id"],
  // });
  console.log(transaction);
  if (!transaction) {
    res.json({ state: 0, error: "User doesn't exist" });
  } else {
    res.send(transaction);
  }
});

module.exports = router;
