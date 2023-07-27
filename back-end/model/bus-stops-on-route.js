const mongoose = require("mongoose");

const busStopsOnRouteSchema = new mongoose.Schema(
  {
    RouteNo: { type: String, required: true },
    StopNos: { type: Array, required: true },
  },
  { collection: "bus-stops-on-route" }
);

module.exports = mongoose.model("bus-stops-on-route", busStopsOnRouteSchema);
