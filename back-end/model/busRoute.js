const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
    RouteNo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Routes", busRouteSchema);