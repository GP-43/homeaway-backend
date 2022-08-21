const express = require('express');
const router = express.Router();
const {Occupants} = require("../models");

router.get("/", (req, res) => {
   res.json("Hello world");
});

router.post("/", async (req, res) => {
   const occupant = req.body;
   await Occupants.create(occupant);
   res.json(occupant);
});

module.exports = router;