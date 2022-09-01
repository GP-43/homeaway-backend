const express = require('express');
const router = express.Router();
const { Occupants, Users } = require("../models");
const jsonwebtoken = require("jsonwebtoken");

place.get("/", async (req, res) => {
    const { email, name, contact, location, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Occupants.create({
            email: email,
            name: name,
            contact: contact,
            location: location,
            password: hash,
            role: 2,
        });
        res.json("SUCCESS");
    });
});


module.exports = router;