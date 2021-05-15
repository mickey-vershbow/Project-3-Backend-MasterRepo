// grab environment variables
require("dotenv").config();
// Import Mongoose
const mongoose = require("mongoose");
// IMPORT MERCED LOGGER FOR COLORFUL LOGS
const { log } = require("mercedlogger");

///////////////////////////////////
// Mongoose Configuration Object to Avoid Warnings
///////////////////////////////////
//retrieving our Mongo URL from our environmental variables (.env)
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/defaultdb";
// store the connection object inside a variable
const db = mongoose.connection;
// config object to remove warnings
const mongoconfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};
// connect to the database
mongoose.connect(MONGODB_URL, mongoconfig, () => {
  console.log("CONNECTED TO MONGO");
});

///////////////////////////////////
// Handling Connection Events
///////////////////////////////////
mongoose.connection
  // Event for When Connection Opens
  .on("open", () => log.green("STATUS", "Connected to Mongo"))
  // Event for When Connection Closes
  .on("close", () => log.red("STATUS", "Disconnected from Mongo"))
  // Event for Connection Errors
  .on("error", (error) => log.red("ERROR", error));

///////////////////////////////////
// Exporting Our Connection
///////////////////////////////////
module.exports = mongoose;
