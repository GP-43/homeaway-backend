const express = require('express');
const router = express.Router();
const { Places } = require("../models");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

//Best Renting

router.get("/bestplaces", async (req, res) => {

    // const {email, password} = req.body;

    const places = await Places.findAll({ where: { rating: 4 } });
    console.log(places)
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(places)
    }
});

//latest place

router.get("/latestplaces", async (req, res) => {
    const {Op} = require("sequelize");
    const datetime = new Date();
    const endDate = new Date(datetime.toISOString().slice(0,10));
    const startDate = new Date(datetime.getFullYear(), 
                            datetime.getMonth(), 
                            datetime.getDate() - 7).toISOString().slice(0,10);                  

    const places = await Places.findAll({
        where: {createDate: {
            [Op.lt]:startDate,
            [Op.gt]:endDate
        }}   
     } 
    );
    
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.send(places)
    }
});

module.exports = router;