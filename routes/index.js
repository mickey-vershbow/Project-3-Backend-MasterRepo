require("dotenv").config();
const router = require("express").Router();
const mongoose = require("../db/connection");
const db = mongoose.connection;
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
// const SECRET = process.env.SECRET || "secret";
// const People = require("../Models/People");


///////////////////////////////
// ROUTES
////////////////////////////////

router.use("/index", (req, res) => {
    res.send("hello index")
})


module.exports = router;
