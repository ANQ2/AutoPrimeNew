const express = require("express");
const router = express.Router();
const Supply = require("../models/Supply");

router.get("/", async (req, res) => {
    const supplies = await Supply.find();
    res.json(supplies);
});

module.exports = router;
