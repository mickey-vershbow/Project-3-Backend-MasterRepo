//////////////////////
// DEPENDENCIES
//////////////////////
// grab environment variables
require("dotenv").config();
// IMPORT EXPRESS
const express = require("express");
// IMPORT DATABASE CONNECTION
const mongoose = require("./db/connection");
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
// const SECRET = process.env.SECRET || "secret";
// IMPORT ROUTER
const IndexRouter = require('./routes/index');

//////////////////////
// APP OBJECT
//////////////////////
const app = express();

/////////////////////////
// MIDDLEWARE
/////////////////////////

app.use(express.json());
app.use(cors()); // Prevent Cors Errors if building an API
app.use(methodOverride("_method")); // Swap method of requests with _method query
app.use(express.static("public")); // serve the public folder as static
app.use(morgan("tiny")); // Request Logging
app.use(express.json()); // Parse json bodies
app.use(express.urlencoded({ extended: false })); //parse bodies from form submissions
// SESSION MIDDLEWARE REGISTRATION (adds req.session property)

//////////////////////
// ROUTES
//////////////////////

//Home router
app.use("/", (req, res) => {
    res.send("hello world");
});

app.use("/index", IndexRouter);

//////////////////////
// LISTENER
//////////////////////

// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(PORT, () =>
  log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)
);
