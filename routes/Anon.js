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

module.exports = router;