const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
    StopNo: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Routes", busRouteSchema);