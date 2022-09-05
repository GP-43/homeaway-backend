const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const occupantsRouter = require("./routes/Occupants");
app.use("/auth", occupantsRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening port`);
    });
});