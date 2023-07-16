const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
  RouteNo: { type: String, required: true },
  StopNos: { type: Array, required: true },
});

module.exports = mongoose.model("Route", busRouteSchema);
