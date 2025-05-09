const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Submit Feedback
router.post("/submit", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    next(error);
  }
});

// Get all Feedbacks (for admin panel)
router.get("/all", async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
