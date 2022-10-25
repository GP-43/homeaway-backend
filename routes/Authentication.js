const express = require('express');
const router = express.Router();
const {Occupants, Places, Users} = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const {email, name, contact, location, password} = req.body;
    const existEmail = await Occupants.findOne({where: {email: email}});
    if (existEmail === null) {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                email:email,
                password: hash,
                role:2,
            }).then(result =>{
                Occupants.create({
                    email: email,
                    name: name,
                    contact: contact,
                    location: location,
                    password: hash,
                    role: 2,
                    UserId: result.id,
                });
            });
            debugger

            res.json("SUCCESS");
        });
    } else {
        res.json("Email is already exist")
    }
});

router.post("/login", async (req, res) => {

    // admin role -> 1, occupant role -> 2, renter role -> 3

    const {email, password} = req.body;
    const user = await Occupants.findOne({where: {email: email}});
    // const occupant = await Occupants.findOne({where: {email: email}});
    if (!user) {
        res.json({state: 0, error: "User doesn't exist!"});
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({error: "Invalid username or password"});
            } else {
                const accessToken = jsonwebtoken.sign(
                    {role: user.role, id: user.id},
                    "secretaryship",
                    {expiresIn: '1h'}
                );
                res.json({state: 1, data: {role: user.role, userId: user.id, token: accessToken}});
            }
        });
    }
});


router.put("/updatePassword/:id", async (req, res) => {
    const userId = req.params.id;
    const passwordDetails = req.body;
    const Password1 = passwordDetails.Password;
    console.log("backend",userId,Password1)
    // const hashed = bcrypt.hash(Password1, 10);
    // console.log("Hashed password", hashed)
    bcrypt.hash(Password1, 10).then((hash) => {
        Occupants.update(
        {
            password : hash,
        },
        {
            where: { UserId: userId }
        });

        res.json("Done")
});
});

module.exports = router;