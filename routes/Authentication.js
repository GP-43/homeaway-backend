const express = require('express');
const router = express.Router();
const {Occupants, Places} = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const {email, name, contact, location, password} = req.body;
    const existEmail = await Occupants.findOne({where: {email: email}});
    if (existEmail === null) {
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
    } else {
        res.json("Email is already exist")
    }
});

router.post("/login", async (req, res) => {

    const {email, password} = req.body;
    const occupant = await Occupants.findOne({where: {email: email}});
    if (!occupant) {
        res.json({state: 0, error: "User doesn't exist!"});
    } else {
        bcrypt.compare(password, occupant.password).then((match) => {
            if (!match) {
                res.json({error: "Invalid username or password"});
            } else {
                const accessToken = jsonwebtoken.sign(
                    {role: occupant.role, id: occupant.id},
                    "secretaryship",
                    {expiresIn: '1h'}
                );
                res.json({state: 1, data: {role: occupant.role, userId: occupant.id, token: accessToken}});
            }
        });
    }
});

router.get("/bookings", async (req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.json(bookings);
    }
});

// router.get("/users", async (req, res) => {

//     // const {email, password} = req.body;

//     const occupant = await Occupants.findAll({where: {role: 2}});
//     console.log(occupant)
//     if (!occupant) {
//         res.json({state: 0, error: "User doesn't exist"});
//     } else {
//         console.log(occupant)
//     }
// });


module.exports = router;