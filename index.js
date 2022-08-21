const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

const db = require("./models");

const occupantsRouter = require("./routes/Occupants");
app.use("/Occupants", occupantsRouter);

db.sequelize.sync().then(() => {

    app.listen(port, () => {
        console.log(`Example app listening port`);
    });
});