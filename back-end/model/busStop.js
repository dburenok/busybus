const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
  StopNo: { type: Number, required: true },
  AtStreet: { type: String, required: true },
  BayNo: { type: String, required: true },
  City: { type: String, required: true },
  Distance: { type: Number, required: true },
  Latitude: { type: Number, required: true },
  Longitude: { type: Number, required: true },
  Name: { type: String, required: true },
  OnStreet: { type: String, required: true },
  Routes: { type: String, required: true },
  WheelchairAccess: { type: Number, required: true },
});

module.exports = mongoose.model("Stop", busStopSchema);
