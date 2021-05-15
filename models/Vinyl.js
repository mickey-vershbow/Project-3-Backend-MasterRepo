const { Schema, model } = require("mongoose");

const VinylSchema = new Schema({
  name: String,
  title: String,
  image: String,
  year: String,
  notes: String
});

const Vinyl = model("Vinyl", VinylSchema);

module.exports = Vinyl;
