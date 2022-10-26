const express = require('express');
const router = express.Router();
const { Occupants, Complaint, Payments, Notifications, Places, Bookings, Transactions } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sequelize = require("sequelize");
const TODAY = new Date();


router.get("/renterBooking/:id", async (req, res) => {
    const userId = req.params.id;
    const myrentings = await Bookings.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("booking_id")), "user_booking_count"],
        ],
        where: {
            renter_id: userId,
        },
    }
    );
    if (!myrentings) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.json(myrentings);
    }
});

router.get("/countOccupants", async (req, res) => {
    const count = await Occupants.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("role")), "occupant_count"],
        ],
        where: {
            role: 2,
        },
    });

    console.log(count);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});

router.get("/countNewOccupants", async (req, res) => {
    const count = await Occupants.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("role")), "new_occupant_count"],
        ],
        where: {
            role: 2,
            joinedDate: TODAY,
        },
    });

    console.log(TODAY);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});



router.get("/countRenters", async (req, res) => {
    const count = await Occupants.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("role")), "renter_count"],
        ],
        where: {
            role: 3,
        },
    });

    console.log(count);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});

router.get("/countBookings", async (req, res) => {
    const count = await Bookings.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("booking_id")), "booking_count"],
        ],
        where: {
            status: 1,
        },
    });

    console.log(count);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});

router.get("/countCancelledBookings", async (req, res) => {
    const count = await Bookings.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("booking_id")), "cancelled_booking_count"],
        ],
        where: {
            status: 0,
        },
    });

    console.log(count);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});

router.get("/totalPayment", async (req, res) => {
    const transaction = await Transactions.findAll({
        attributes: [
            [sequelize.fn("SUM", sequelize.col("amount")), "total_income"],
        ],
    });

    console.log(transaction);
    if (!transaction) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(transaction);
    }
});

router.get("/totalIncome", async (req, res) => {
    const transaction = await Transactions.findAll({
        attributes: [
            [sequelize.fn("SUM", sequelize.col("profit")), "total_profit"],
        ],
    });

    console.log(transaction);
    if (!transaction) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(transaction);
    }
});

router.get("/todayEarnings", async (req, res) => {
    const transaction = await Transactions.findAll({
        attributes: [
            [sequelize.fn("SUM", sequelize.col("profit")), "today_income"],
        ],
        where: sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', '2022-10-27')
    });

    console.log(TODAY);
    if (!transaction) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(transaction);
    }
});

router.get("/countPlaces", async (req, res) => {
    const count = await Places.findAll({
        attributes: [
            [sequelize.fn("COUNT", sequelize.col("title")), "place_count"],
        ],
    });

    console.log(count);
    if (!count) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(count);
    }
});

//select occupants
router.get("/users", async (req, res) => {
    const occupant = await Occupants.findAll({ where: { role: 2 } });
    console.log(occupant)
    if (!occupant) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(occupant)
    }
});

router.get("/view/places", async (req, res) => {

    // const {email, password} = req.body;

    const place = await Places.findAll();
    console.log(place)
    if (!place) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(place)
    }
});

router.get("/view/renters", async (req, res) => {

    // const {email, password} = req.body;

    const renter = await Occupants.findAll({ where: { role: 3 } });
    console.log(renter)
    if (!renter) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(renter)
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

router.get("/view/sortpayment", async (req, res) => {

    // const {email, password} = req.body;

    const payment = await Payments.findAll({
        order: [
            ['amount', 'DESC'],]
    });
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
            where: { status: 1 }
        }
    );
    console.log(complaint)

    if (!complaint) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(complaint)
    }
});


//select accepted complaints

router.get("/select/acceptedComplaints", async (req, res) => {

    const complaint = await Complaint.findAll(
        {
            where: { status: 2 }
        }
    );
    console.log(complaint)
    if (!complaint) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(complaint)
    }
});


//select rejected complaints

router.get("/select/rejectedComplaints", async (req, res) => {

    const complaint = await Complaint.findAll(
        {
            where: { status: 0 }
        }
    );
    console.log(complaint)
    if (!complaint) {
        res.json({ state: 0, error: "User doesn't exist" });
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
    const ids = req.body;
    console.log(ids)
    const acceptComplaint = await Complaint.update(
        {
            status: 2,
        },
        {
            where: { id: complaintId }
        });
    if (!acceptComplaint) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    } else {

        await Notifications.create({
            compliner_id: ids.complainerId,
            complainee_id: ids.complaineeId,
            status: "accepted",
            complaint_id: complaintId
        });

        res.json(acceptComplaint)
    }

});


//reject complain

router.put("/reject/complaint/:id", async (req, res) => {

    const complaintId = req.params.id;
    const ids = req.body;
    const rejectComplaint = await Complaint.update(
        {
            status: 0,
        },
        {
            where: { id: complaintId }
        },
    );

    if (!rejectComplaint) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    } else {
        await Notifications.create({
            compliner_id: ids.complainerId,
            complainee_id: ids.complaineeId,
            status: "rejected",
            complaint_id: complaintId
        });
        res.json(rejectComplaint)
    }

});

//delete Occupant/update table

router.put("/delete/occupant/:id", async (req, res) => {

    const occupantId = req.params.id;
    const deleteOccupant = await Occupants.update(
        {
            role: "0",
        },
        {
            where: { id: occupantId }
        },
    );

    if (!deleteOccupant) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    } else {
        res.json(deleteOccupant)
    }

});

//delete Renter/update table

router.put("/delete/renter/:id", async (req, res) => {

    const renterId = req.params.id;
    const deleteRenter = await Occupants.update(
        {
            role: "0",
        },
        {
            where: { id: renterId }
        },
    );

    if (!deleteRenter) {
        res.json({ state: 0, error: "Complaint doesn't exist" });
    } else {
        res.json(deleteRenter)
    }

});


module.exports = router;