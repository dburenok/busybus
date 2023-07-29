const express = require("express");
const {
  getRoutes,
  findRoute,
  getBusesOnStop,
  getBusesOnRoute,
} = require("../controllers/busRouteController");
const router = express.Router();

// GET all routes
router.get("/", async (req, res) => {
  await getRoutes(req, res);
});

// GET route with given RouteNo
router.get("/:routeNo", async (req, res) => {
  await findRoute(req, res);
});

// Update route with given RouteNo/id
router.patch("/:routeNo", (req, res) => {
  // Stub - not implemented, can use this for updating a bus route capacity
  res.send("stub-patch");
});

// GET buses on a given bus stop
router.get("/:selectedRoute/buses", async (req, res) => {
  await getBusesOnRoute(req, res);
});

module.exports = router;
