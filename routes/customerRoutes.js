const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
