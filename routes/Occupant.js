const express = require("express");
const router = express.Router();
const { Places, Occupants, Complaint, Bookings } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

// const multer = require("multer");
// const { Places } = require("../models");

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, "./public/profileImages/");
//     },
//     filename: function (req, file, callback) {
//       const fileNameSplit = file.originalname.split(".");
//       callback(
//         null,
//         file.originalname +
//         Math.random() +
//         "." +
//         fileNameSplit[fileNameSplit.length - 1]
//       );
//     },
//   });

//   var upload = multer({ storage: storage });




router.get("/bookings:id", async(req, res) => {
    const userId = req.params.id;
    console.log("userid" + userId);
    const bookings = await Places.findAll({
        where: { id: userId }
    });
    if (!bookings) {
        res.json({ state: 0, error: "User doesn't exist" });
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

router.get("/select/profileDetails/:id", async(req, res) => {
    const userId = req.params.id;
    const profileDetails = await Occupants.findAll({
        where: { id: userId }
    });
    console.log(profileDetails)
    if (!profileDetails) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(profileDetails)
    }
});


router.post('/booking', (req, res) => {
    const { startDate, endDate, startTime, endTime, occupantId, renterId, placeId, status, } = req.body;
    // console.log("meheta enwd???" + bookingDetails);
    debugger;
    Bookings.create({
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        occupant_id: occupantId,
        renter_id: renterId,
        place_id: placeId,
        status: status,
    }).then(
        res.JSON("SUCCESS")
    )
});

//update profile details
router.put("/update/profile/:id", async(req, res) => {
    const userId = req.params.id;
    const details = req.body;
    const updateProfile = await Occupants.update({
        // name : details.Name,
        location: details.Location,
        contact: details.Contact,
    }, {
        where: { id: userId }
    });
    if (!updateProfile) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    }
    res.json(updateProfile)
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
            "booking_id",
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

router.get("/getoccupantinfo/:id", async(req, res) => {
    const occupantId = req.params.id;
    const occupantinfo = await Occupants.findAll({
        where: {
            UserId: occupantId,
        },
    });

    console.log(occupantinfo);
    if (!occupantinfo) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(occupantinfo);
    }
})

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


module.exports = router;