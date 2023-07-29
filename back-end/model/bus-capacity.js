const mongoose = require("mongoose");

const busCapacitySchema = new mongoose.Schema(
  {
    VehicleNo: { type: String, required: true },
    Capacity: { type: Number, required: true },
    ReportTime: { type: Date, required: true, default: Date.now },
  },
  { collection: "bus-capacity" }
);

module.exports = mongoose.model("bus-capacity", busCapacitySchema);
