const express = require("express");
const router = express.Router();
const { Places, Occupants, Bookings } = require("../models");

router.get("/bookings", async(req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.json(bookings);
    }
});

router.post("/occupantName/", async(req, res) => {
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

router.get("/booking/:id", async(req, res) => {
    const occupantId = req.params.id;
    const booking = await Bookings.findAll({
        attributes: [
            "start_date",
            "end_date",
            "start_time",
            "end_time",
            "occupant_id",
            "place_id",
            "status",
        ],
        where: {
            status: 1,
            occupant_id: occupantId,
        },
    });

    console.log(booking);
    if (!booking) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(booking);
    }
});

module.exports = router;