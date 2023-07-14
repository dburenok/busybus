const express = require("express");
const { getRoutes, findRoute } = require("../controllers/busRouteController");
const { find } = require("../model/busRoute");
const router = express.Router();

// Getting all bus routes
router.get("/", (req, res) => {
    getRoutes(req, res);
});
// Getting a specific bus route
router.get("/:id", (req, res) => {
    findRoute(req, res);
});
// Updating one bus route
router.patch("/:id", (req, res) => {
    // Stub - not implemented, can use this for updating a bus route capacity
    res.send("stub-patch");
});

module.exports = router;