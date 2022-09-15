const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Places } = require("../models");

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

var upload = multer({ storage: storage });

router.get("/places", async (req, res) =>  {
    const places = await Places.findAll();
    if (!places) {
        res.json({ state: 0, error: "User doesn't exist" });
    } else {
        res.json(places);
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

module.exports = router;


