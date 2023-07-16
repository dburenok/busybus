const express = require("express");
const {
  getStops,
  findStop,
  getBusesOnStop,
} = require("../controllers/busStopController");
const router = express.Router();

// GET all bus stops
router.get("/", async (req, res) => {
  await getStops(req, res);
});

// GET buses on a given bus stop
router.get("/:stopNo/buses", async (req, res) => {
  await getBusesOnStop(req, res);
});

// GET bus stop with given StopNo
router.get("/:stopNo", async (req, res) => {
  await findStop(req, res);
});

module.exports = router;
