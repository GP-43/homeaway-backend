const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const occupantsRouter = require("./routes/Occupants");
const placeRouter = require("./routes/Places");


app.use("/auth", occupantsRouter);
app.use("/places", placeRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening port`);
    });
});