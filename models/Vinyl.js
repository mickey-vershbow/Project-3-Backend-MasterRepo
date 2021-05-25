const { Schema, model } = require("mongoose");

// const VinylSchema = new Schema({
//   name: String,
//   title: String,
//   image: String,
//   year: String,
//   notes: String
// });

const VinylSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: String,
    title: String,
    image: String,
    year: String,
    notes: String,
  },
  { timestamps: true }
);

const Vinyl = model("Vinyl", VinylSchema);

module.exports = Vinyl;
