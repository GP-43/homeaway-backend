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
    const endDate = Date.now();
    const startDate= endDate -7;
    //const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
    const places = await Places.findAll({
        where: {between : [endDate, startDate]}
     } 
    );
    console.log(places)
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(places)
    }
});

module.exports = router;