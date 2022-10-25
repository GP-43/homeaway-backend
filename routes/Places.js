const express = require("express");
const router = express.Router();
const multer = require("multer");
const {Places, Review} = require("../models");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images/");
    },
    filename: function (req, file, callback) {
        const fileNameSplit = file.originalname.split(".");
        callback(
            null,
            file.originalname +
            Math.random() +
            "." +
            fileNameSplit[fileNameSplit.length - 1]
        );
    },
});

var upload = multer({storage: storage});

router.get("/places", async (req, res) => {
    const places = await Places.findAll();
    if (!places) {
        res.json({state: 0, error: "Place doesn't exist"});
    } else {
        res.json({places});
    }
});


router.post("/",
    upload.single("image"),
    async (req, res) => {
        const {
            title,
            quantity,
            priceType,
            address,
            roomCategory,
            contactNo,
            price,
            city,
            postalCode,
            description,
            wifi,
            parking,
            ac,
            silent,
            food,
            washroom,
            rating,

        } = JSON.parse(req.body.addNewFormData);
        // console.log('Body:', req.body);

        const image = req.file.filename;
        console.log("---------------------");
        console.log(title);
        console.log(quantity);
        console.log(priceType);
        console.log(address);
        console.log(roomCategory);
        console.log(contactNo);
        console.log(price);
        console.log(city);
        console.log(postalCode);
        console.log(description);
        console.log(image);

        Places.create({
            title: title,
            quantity: quantity,
            priceType: priceType,
            address: address,
            roomCategory: roomCategory,
            contactNo: contactNo,
            price: price,
            city: city,
            postalCode: postalCode,
            description: description,
            image: image,
            wifi: wifi,
            parking: parking,
            ac: ac,
            silent: silent,
            food: food,
            washroom: washroom,
            rating: 0,
        })
            .then((response) => {
                console.log(response);
                return res.status(201).send("record created");
            })
            .catch((err) => {
                console.log(err);
                return res.status(501).send("something went wrong");
            });
    });

router.get('/place/:placeId', async (req, res) => {
    const placeId = req.params.placeId;
    const place = await Places.findByPk(placeId);
    res.json(place);
});

router.post('/review', async (req, res) => {
    const {rate, review, placeId, occupantId} = req.body;
    Review.create({
        rate: rate,
        review: review,
        placeId: placeId,
        occupantId: occupantId,
    }).then(
        res.json("SUCCESS")
    )
})

router.get('/review/:placeId', async (req, res) => {
    const placeId = req.params.placeId;
    res.json(placeId)

    const reviews = await Review.findAll({where: {placeId: placeId}});
    res.json(reviews);
});
router.get('/rating/:placeId', async (req, res) => {
    const placeId = req.params.placeId;
    const rate1 = await Review.count({where: {placeId: placeId, rate: 1}});
    const rate2 = await Review.count({where: {placeId: placeId, rate: 2}});
    const rate3 = await Review.count({where: {placeId: placeId, rate: 3}});
    const rate4 = await Review.count({where: {placeId: placeId, rate: 4}});
    const rate5 = await Review.count({where: {placeId: placeId, rate: 5}});
    const rateAll = await Review.count({where: {placeId: placeId}});
    const rate = {rate1: rate1, rate2: rate2, rate3: rate3, rate4: rate4, rate5: rate5, rateAll:rateAll};
    res.json(rate);
});

module.exports = router;



