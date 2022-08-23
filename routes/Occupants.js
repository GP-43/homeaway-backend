const express = require('express');
const router = express.Router();
const {Occupants, Users} = require("../models");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
    const {email, name, contact, location, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Occupants.create({
            email: email,
            name: name,
            contact: contact,
            location: location,
            password: hash,
        });
        res.json("SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const occupant = await Occupants.findOne({where: {email: email}});

    if (!occupant) {
        res.json({error: "User doesn't exist"});
    } else {
        bcrypt.compare(password, occupant.password).then((match) => {
            if (!match) {
                res.json({error: "Invalid username or password"});
            } else {
                res.json("Logged in");
            }
        });
    }
});

module.exports = router;