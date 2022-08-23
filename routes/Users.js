const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const {hash} = require("bcrypt");

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    });
});

// router.post("/login", async (req, res) => {
//    const {email, password} = req.body;
//
//    const user = await Users.findOne({where: {email: email}});
//
//    if (!user) {
//        res.json({error: "User doesn't exist"});
//    }
//
//    bcrypt.compare(password, user.password).then((match)=>{
//        if(!match) {
//            res.json({error: "Invalid username or password"});
//        }
//        res.json("Logged in");
//    });
// });

module.exports = router;