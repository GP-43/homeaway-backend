const express = require("express");
const placesRouter = express.Router();

placesRouter.get("/", (req, res) => {

    const data = [];

    const query = "SLECT * FROM places";

    return res.status(200).send(data);




})

placesRouter.post("/", (req, res) => {
})

placesRouter.get("/:id", (req, res) => {
})

module.exports = placesRouter;

//localhost:4000/places/122