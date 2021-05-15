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
const Vinyl = require("../Models/Vinyl");

//////////////////////
// SEED DATA
///////////////////////
const vinylArr = [
  {
    name: "PJ Harvey",
    title: "To Bring You My Love",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VLlmLOfO94tbcQ1xrQERXwHaHg%26pid%3DApi&f=1",
    year: "1995",
    notes: "",
  },
  {
    name: "Bruce Springsteen",
    title: "The River",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.YwR1lvfuEL-8UEyOu5T5PAHaHa%26pid%3DApi&f=1",
    year: "1980",
    notes: "",
  },
  {
    name: "John Coltrane",
    title: "Blue Train",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Rx4iKwoebG3uFOfqaprwdwHaHa%26pid%3DApi&f=1",
    year: "1958",
    notes: "",
  },
  {
    name: "Joni Mitchell",
    title: "Hejira",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.d3W_Y5PjPGDrTb9XiTBpyQHaHa%26pid%3DApi&f=1",
    year: "1976",
    notes: "",
  },
];

///////////////////////////////
// ROUTES
////////////////////////////////

router.get("/", (req, res) => {
  //res.json lets us send a response as JSON data
  res.json({
    response: "Hello World",
  });
});

router.get("/vinyl", (req, res) => {
  Vinyl.find({}, (error, allVinyl) => {
    res.json(allVinyl);
  });
});

router.get("/vinyl/seed", (req, res) => {
  Vinyl.collection.drop();
  Vinyl.create(vinylArr, (error, record) => {
    if (error) {
      console.log(error);
    } else {
      res.json(vinylArr);
    }
    db.close();
  });
});

module.exports = router;
