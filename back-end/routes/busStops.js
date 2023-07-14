const express = require("express");
const { getStops } = require("../controllers/busStopController");
const { findStop } = require("../controllers/busStopController");
const router = express.Router();

// Getting all bus stops
router.get("/", (req, res) => {
    getStops(req, res);
});
// Getting a specific bus stop
router.get("/:id", (req, res) => {
    findStop(req, res);
});

module.exports = router;