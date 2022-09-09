const express = require('express');
const router = express.Router();
const { Occupants, Complaint, Payments } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


router.get("/users", async (req, res) => {

    // const {email, password} = req.body;

    const occupant = await Occupants.findAll({ where: { role: 2 } });
    console.log(occupant)
    if (!occupant) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(occupant)
    }
});

//View payments

router.get("/view/payment", async (req, res) => {

    // const {email, password} = req.body;

    const payment = await Payments.findAll();
    console.log(payment)
    if (!payment) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(payment)
    }
});

//delete complain

router.delete("/delete/complaint", async (req, res) => {

    const { complaintId } = req.body;
    const deleteComplaint = await Complaint.destroy({ where: { id: complaintId } });
    console.log(`deleted row(s): ${count}`);
    // const occupant = await Occupants.findAll({where: {role: 2}});
    // console.log(occupant)
    if (!deleteComplaint) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(deleteComplaint)
    }
});


module.exports = router;