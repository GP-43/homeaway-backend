const express = require('express');
const router = express.Router();
const { Places } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

//Best Renting

router.get("/bestplaces", async (req, res) => {

    // const {email, password} = req.body;

    const places = await Places.findAll({ where: { rating: 4 } });
    console.log(places)
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(places)
    }
});

//latest place

router.get("/latestplaces", async (req, res) => {

    // const {email, password} = req.body;          {where: {createAt: new Date()-7}}
    const places = await Places.findAll({});
    console.log(places)
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(places)
    }
});

module.exports = router;