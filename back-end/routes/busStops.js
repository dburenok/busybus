const express = require("express");
const { getStops, findStop, findStopLatLong} = require("../controllers/busStopController");
const router = express.Router();

// GET all bus stops
router.get("/", async (req, res) => {
  await getStops(req, res);
});

// GET bus stop with given StopNo
router.get("/:stopNo", async (req, res) => {
  await findStop(req, res);
});

// GET bus stop with given coordinates (latitude, longitude)
router.get("/:latitude/:longitude", async (req, res) => {
  await findStopLatLong(req, res);
});
module.exports = router;
