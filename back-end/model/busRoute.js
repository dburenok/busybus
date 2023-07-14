const mongoose = require("mongoose");

const busRouteSchema = new mongoose.Schema({
    StopNo: {
        type: Number,
        required: true
    },
    UpdatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Stops", busRouteSchema);