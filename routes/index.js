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
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
const { SECRET } = process.env;
const auth = require("../auth/index");
const Vinyl = require("../models/Vinyl");
const User = require("../models/User");

//////////////////////
// SEED DATA
///////////////////////
// seed MongoDB
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

//! Seed MongoDB Route
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

// test route
router.get("/", auth, (req, res) => {
  // res.send("hello world");
  res.json(req.payload);
});

// Mongo Index Page - All Vinyl
router.get("/vinyl", (req, res) => {
  Vinyl.find({}, (error, allVinyl) => {
    res.json(allVinyl);
  });
});

// Create New Vinyl
router.post("/vinyl", async (req, res) => {
  try {
    // send all vinyl
    res.json(await Vinyl.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Delete Vinyl
router.delete("/vinyl/:id", (req, res) => {
  let deletedVinyl = req.params.id;
  Vinyl.findByIdAndRemove(req.params.id, (error, data) => {
    console.log("The following Vinyl was deleted: ", deletedVinyl);
    res.redirect("/vinyl");
  });
});

// Update Vinyl
router.put("/vinyl/:id", async (req, res) => {
  try {
    res.json(
      await Vinyl.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

////////////////////////////////
// User Auth Routes
///////////////////////////////
router.post("/signup", auth, async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", auth, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = await jwt.sign({ username }, SECRET);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "PASSWORD DOES NOT MATCH" });
      }
    } else {
      res.status(400).json({ error: "USER DOES NOT EXIST" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

/////////////////////////
// Export Router
///////////////////////
module.exports = router;
