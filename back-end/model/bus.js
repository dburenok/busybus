const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    VehicleNo: { type: String, required: true },
    TripId: { type: Number, required: true },
    RouteNo: { type: String, required: true },
    Direction: { type: String, required: true },
    Destination: { type: String, required: true },
    Pattern: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    ReportTime: { type: Date, required: true, default: Date.now },
  },
  { collection: "bus" }
);

module.exports = mongoose.model("bus", busSchema);
