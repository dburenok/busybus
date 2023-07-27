const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    RouteNo: { type: String, required: false },
    StopNo: { type: Number, required: false },
    RequestTime: { type: Date, required: true, default: Date.now },
  },
  { collection: "search-history" }
);

module.exports = mongoose.model("search-history", searchHistorySchema);
