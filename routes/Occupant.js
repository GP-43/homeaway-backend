const express = require('express');
const router = express.Router();
const {Places, Occupants, Review} = require("../models");

router.get("/bookings", async (req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.json(bookings);
    }
});

router.post("/occupantName/", async (req, res) => {
    const occupantIdArr = req.body;
    const occupantIds = occupantIdArr.map((item) => {
        return item.occupantId;
    })
    const occupantsNames = (await Occupants.findAll({
        attributes: ['name', 'userId'],
        where: {
            userId: occupantIds
        }
    }))
    res.json(occupantsNames);
});

module.exports = router;