const express = require("express");
const { getEstimates } = require("../controllers/estimatesController");
const router = express.Router();

// GET estimate for a route under a stop
router.get("/:stopNo/:routeNo", async (req, res) => {
  return await getEstimates(req, res);
});

module.exports = router;
