const express = require("express");
const router = express.Router();
const { Places, Bookings } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

router.post("/makebooking", async (req, res) => {
    const {

    } = JSON.parse(req.body.addNewFormData);
})

router.get("/bookings", async (req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.json(bookings);
    }
});

router.get("/booking/:id", async (req, res) => {
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
