const express = require('express');
const router = express.Router();
const {Occupants, Users, Places} = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const {email, name, contact, location, password} = req.body;
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

router.post("/login", async (req, res) => {

    const {email, password} = req.body;
    const occupant = await Occupants.findOne({where: {email: email}});
    console.log(occupant)
    if (!occupant) {
        res.json({state: 0, error: "User doesn't existtt!"});
    } else {
        bcrypt.compare(password, occupant.password).then((match) => {
           if (!match) {
                res.json({error: "Invalid username or password"});
            } else {
                const accessToken = jsonwebtoken.sign(
                    {role: occupant.role, id:occupant.id},
                    "secretaryship",
                    {expiresIn: '1h'}
                );
                //console.log(occupant);
                res.json({state: 1, data: { role: occupant.role, token: accessToken}});
            }
        });
    }
});

router.get("/bookings", async (req, res) =>  {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({ state: 0, error: "User doesn't exist" });
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