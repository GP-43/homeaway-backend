const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
var bodyParser = require('body-parser')

app.use(express.json());
app.use(cors());
// Serves static files
app.use(express.static('public'));


const db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const occupantsRouter = require("./routes/Occupants");
app.use("/auth", occupantsRouter);

const placesrouter = require("./routes/Places");
app.use("/addnewrent", placesrouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening ${port}`);
    });
});
