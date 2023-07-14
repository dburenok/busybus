const express = require("express");
const router = express.Router();

// Getting all bus routes
router.get("/", (req, res) => {
    // dummy
    res.send("stub-get-all");
});
// Getting a specific bus route
router.get("/:id", (req, res) => {
    // dummy
    res.send("stub-get-id");
});
// Updating one bus route
router.patch("/:id", (req, res) => {
    // Stub
    res.send("stub-patch");
});

module.exports = router;