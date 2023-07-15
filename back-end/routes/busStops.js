const express = require("express");
const { getStops } = require("../controllers/busStopController");
const { findStop } = require("../controllers/busStopController");
const router = express.Router();

// GET all bus stops
router.get("/", async (req, res) => {
  await getStops(req, res);
});

// GET bus stop with given StopNo
router.get("/:stopNo", async (req, res) => {
  await findStop(req, res);
});

module.exports = router;
