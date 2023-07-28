const express = require("express");
const { getBusCapacity, postBusCapacity } = require("../controllers/busCapacityController");
const router = express.Router();

// GET 
router.get("/:busNo", async (req, res) => {
    await getBusCapacity(req, res);
  });

router.post("/:busNo", async (req, res) => {
  await postBusCapacity(req, res);
});

module.exports = router;