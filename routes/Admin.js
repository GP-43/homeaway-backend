const express = require('express');
const router = express.Router();
const {Occupants, Complaint} = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


router.get("/users", async (req, res) => {
    
    // const {email, password} = req.body;

    const occupant = await Occupants.findAll({where: {role: 2}});
    console.log(occupant)
    if (!occupant) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(occupant)
    }
});

//select complaints

router.get("/select/complaints", async (req, res) => {
    
    const complaint = await Complaint.findAll({where: {status: 1}});
    console.log(complaint)
    if (!complaint) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(complaint)
    }
});



//delete complain

router.delete("/delete/complaint/:id", async (req, res) => {
    
    
    const complaintId = req.params.id;
    
    const deleteComplaint = await Complaint.destroy({ where: { id: complaintId } });
    
    
    
    if (!deleteComplaint) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(deleteComplaint)
    }
    

    //params( req.params.id)

    res.json({state: 0, error: complaintId });

});


module.exports = router;