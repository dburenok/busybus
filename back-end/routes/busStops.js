const express = require("express");
const router = express.Router();

// Getting all bus stops
router.get("/", (req, res) => {
    // dummy
    res.send("stub-get-all-stop");
});
// Getting a specific bus stop
router.get("/:id", (req, res) => {
    // dummy
    res.send(`stub-get-id-stop-${req.params.id}`);
});

module.exports = router;