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

module.exports = router;