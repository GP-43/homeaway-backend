const express = require('express');
const router = express.Router();
const {Places, Occupants, Complaint} = require("../models");

router.get("/bookings", async (req, res) => {
    const bookings = await Places.findAll();
    if (!bookings) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.json(bookings);
    }
});

// //get details to profile
// router.get("/select/profile/:id", async (req, res) => {
//     const userId = req.params.id;
//     const profileDetails = await Occupants.findAll({ where: { id: userId } });
//     console.log(profileDetails)
//     if (!profileDetails) {
//         res.json({ state: 0, error: "User doesn't exist" });
//     } else {
//         res.send(profileDetails)
//     }
// }); 


// router.get("/select/rejectedComplaints", async (req, res) => {

//     const profileDetails = await Occupants.findAll(
//         {
//             where: { role: 0 } 
//         }
//     );
//     console.log(profileDetails)
//     if (!profileDetails) {
//         res.json({ state: 0, error: "User doesn't exist" });
//     } else {
//         res.send(profileDetails)
//     }
// });

//select profile details

router.get("/select/profileDetails/:id", async (req, res) => {

    const userId = req.params.id;
    const profileDetails = await Occupants.findAll(
        {
            where: { id: userId }
        }
    );
    console.log(profileDetails)
    if (!profileDetails) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(profileDetails)
    }
});

//update profile details
router.put("/update/profile/:id", async (req, res) => {
    const userId = req.params.id;
    const details = req.body;
    console.log(userId)
    console.log(details)
    const updateProfile = await Occupants.update(
        {
            // name : details.Name,
            location : details.Location,
            contact : details.Contact,
        },
        {
            where: { id: userId }
        });
    if (!updateProfile) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    }
    res.json(updateProfile)
    

});


//update profile details
router.put("/update/profileUserName/:id", async (req, res) => {
    const userId = req.params.id;
    const details = req.body;
    console.log(userId)
    console.log(details)
    const updateProfile = await Occupants.update(
        {
            name : details.Name,
        },
        {
            where: { id: userId }
        });
    if (!updateProfile) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    }
    res.json(updateProfile)
    

});


module.exports = router;