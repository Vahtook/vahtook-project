const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { pickup, destination } = req.body;
  if (!pickup || !destination) {
    return res.status(400).json({ message: "Pickup and destination required" });
  }
  res.json({
    success: true,
    message: "Booking confirmed",
    booking: { pickup, destination, id: Date.now() },
  });
});

module.exports = router;
