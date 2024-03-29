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

const authRouter = require("./routes/Authentication");
app.use("/auth", authRouter);

const occupantRouter = require("./routes/Occupant");
app.use("/occupant", occupantRouter);

const placesRouter = require("./routes/Places");
app.use("/addnewrent", placesRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter);

const anonRouter = require("./routes/Anon");
app.use("/anon", anonRouter);

const renterRouter = require("./routes/Renter");
app.use("/renter", renterRouter); 

const bookingRouter = require("./routes/Booking");
app.use("/booking", bookingRouter); 

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening ${port}`);
    });
});