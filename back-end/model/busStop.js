const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema({
    StopNo: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Stops", busStopSchema);