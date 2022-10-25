const express = require('express');
const router = express.Router();
const { Places } = require("../models");

router.get("/bookings", async (req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.json(bookings);
    }
});

router.post("/makebooking", async (req, res) => {
    const {

    } = JSON.parse(req.body.addNewFormData);
})

module.exports = router;