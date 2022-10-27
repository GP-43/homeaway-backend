const express = require("express");
const router = express.Router();
const {Transactions, Bookings, Occupants, Places, Renters} = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");

router.put("/update/description/:id", async (req, res) => {
    const placeId = req.params.id;
    const description = req.body.description;
    console.log({placeId})
    console.log({description})
    const updateDescription = await Places.update(
        {
            description: description,
        },
        {
            where: {id: placeId}
        });
    if (!updateDescription) {
        res.json({state: 0, error: "Place doesn't exist"});
    }
    res.json(updateDescription)


});

router.post("/addnewrenter/:id", async (req, res) => {

    const renterId = req.params.id;
    const details = req.body;

    const addnewrenter = await Renters.create(
        {
            UserId: renterId,
            name: details.rName,
            image: details.rImage,
            email: details.rEmail,
            contact: details.rContact,
            location: details.rLocation,
            password: details.rPassword,
            role: details.rRole,
            properties: details.rProperties,
            rate: details.rRate,
        }
    );

    if (!addnewrenter) {
        res.json({state: 0, error: "Complaint doesn't exist"});
    } else {
        res.json(addnewrenter)
    }

});


router.get("/myrentings/:id", async (req, res) => {
    const renterId = req.params.id;
    const myrentings = await Places.findAll({
            where: {
                renter_id: renterId,
            },
        }
    );
    if (!myrentings) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.json(myrentings);
    }
});

//get total earnings
router.get("/transactions/:id", async (req, res) => {
    const renterId = req.params.id;
    const transaction = await Transactions.findAll({
        attributes: [
            "renter_id",
            [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
        ],
        group: ["renter_id"],
        where: {
            renter_id: renterId,
        },
    });

    console.log(transaction);
    if (!transaction) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(transaction);
    }
});

//get individual amounts per place
router.get("/paymentofplaces/:id", async (req, res) => {
    const renterId = req.params.id;
    const paymentofplaces = await Transactions.findAll({
        attributes: ["renter_id", "amount", "place_id", "rent_date"],
        where: {
            renter_id: renterId,
        },
    });

    console.log(paymentofplaces);
    if (!paymentofplaces) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(paymentofplaces);
    }
});

//get schedule dates per renter
router.get("/scheduleofplaces/:id", async (req, res) => {
    const renterId = req.params.id;
    const scheduleofplaces = await Bookings.findAll({
        attributes: [
            "start_date",
            "end_date",
            "start_time",
            "end_time",
            "renter_id",
            "place_id",
            "status",
            "booking_id",
        ],
        where: {
            status: 1,
            renter_id: renterId,
        },
    });


    if (!scheduleofplaces) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(scheduleofplaces);
    }
});

//get user role
router.get("/getuserrole/:id", async (req, res) => {
    const userId = req.params.id;
    const getuserrole = await Occupants.findAll({
        attributes: [
            "role",
        ],
        where: {
            id: userId,
        },
    });
    if (!getuserrole) {
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(getuserrole);
    }
});

//check whether a renter already
router.get("/checkwhetherrenter/:id", async (req, res) => {
    const userId = req.params.id;
    const checkwhetherrenter = await Renters.findAll({
        where: {
            UserId: userId,
        },
    });

    console.log(checkwhetherrenter);
    if (!checkwhetherrenter) {
        console.log("hbh", checkwhetherrenter)
        res.json({state: 0, error: "User doesn't exist"});
    } else {
        res.send(checkwhetherrenter);
    }
});

router.get("/rentdetails/:id", async (req, res) => {
    const userId = req.params.id;
    const checkwhetherrenter = await Renters.findAll({
        where: {
            UserId: userId,
        },
    });
});

module.exports = router;
