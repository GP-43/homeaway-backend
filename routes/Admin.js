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


//select complaints

router.get("/select/complaints", async (req, res) => {
    
    const complaint = await Complaint.findAll(
        {
            where: {status: 1}
        }
    );
    console.log(complaint)
    
    if (!complaint) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(complaint)
    }
});
    

//select accepted complaints

router.get("/select/acceptedComplaints", async (req, res) => {
    
    const complaint = await Complaint.findAll(
        {
            where: {status: 2}
        }
    );
    console.log(complaint)
    if (!complaint) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(complaint)
    }
});


//select rejected complaints

router.get("/select/rejectedComplaints", async (req, res) => {
    
    const complaint = await Complaint.findAll(
        {
            where: {status: 0}
        }
    );
    console.log(complaint)
    if (!complaint) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(complaint)
    }
});



// //delete complain

// router.delete("/delete/complaint/:id", async (req, res) => {
    
    
//     const complaintId = req.params.id;
    
//     const deleteComplaint = await Complaint.destroy({ where: { id: complaintId } });
    
    
    
//     if (!deleteComplaint) {
//         res.json({state: 0, error: "Complaint doesn't exist"});
//     } else {
//         res.json(deleteComplaint)
//     }

// });



//accept complain

router.put("/accept/complaint/:id", async (req, res) => { 
   const complaintId = req.params.id; 
const acceptComplaint = await Complaint.update(  
        {
            status: 2,
        },
        {
            where: { id: complaintId } 
        });  
    if (!acceptComplaint) { 
        res.json({state: 0, error: "Complaint doesn't exist"});
    } else {
        res.json(acceptComplaint)
    }
    
});


//reject complain

router.put("/reject/complaint/:id", async (req, res) => {
      
    const complaintId = req.params.id;
    
    const rejectComplaint = await Complaint.update(
        {
            status : 0,
        },
        {
            where: { id: complaintId }
        },
        );  
    
    if (!rejectComplaint) {
        res.json({state: 0, error: "Complaint doesn't exist"});
    } else {
        res.json(rejectComplaint)
    }

});




module.exports = router;