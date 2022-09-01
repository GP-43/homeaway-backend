const { response } = require("express");
const express = require('express');
const router = express.Router();
const multer = require("multer");
const { Places } = require("../models");

router.get("/", async (req, res) => {

    const place = await Posts.findAll()
        .then((response) => {
            console.log(response);
            return res.status(201).send("record created");
        })
        .catch((err) => {
            console.log(err);
            return res.status(501).send("something went wrong");
        });

    res.json(place)

});


// module.exports = router;

// router.post("/places", async (req, res) => {
//     const { title, quantity, pricetype, price, city, image, rating, createdAt } = req.body;

//     const occupant = await Occupants.findOne({ where: { email: email } });
//     console.log(occupant)
//     if (!occupant) {
//         res.json({ state: 0, error: "User doesn't exist" });
//     } else {
//         bcrypt.compare(password, occupant.password).then((match) => {
//             if (!match) {
//                 res.json({ error: "Invalid username or password" });
//             } else {
//                 const accessToken = jsonwebtoken.sign(
//                     { role: occupant.role, id: occupant.id },
//                     "secretaryship",
//                     { expiresIn: '1h' }
//                 );
//                 //console.log(occupant);
//                 res.json({ state: 1, data: { role: occupant.role, token: accessToken } });
//             }
//         });
//     }
// });









// router.get("/", (req, res) => {

//     const data = [];

//     const place = await Places.findAll();
//     console.log(place)

//     return res.status(200).send(data);
// });


// module.exports = router;