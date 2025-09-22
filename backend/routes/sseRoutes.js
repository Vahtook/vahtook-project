const express = require('express');
const router = express.Router();
const sseController = require('../controllers/sseController');

// SSE endpoint for real-time updates
router.get('/orders', (req, res) => {
  sseController.connect(req, res);
});

// Get SSE clients info (for debugging)
router.get('/clients', (req, res) => {
  const clientsInfo = sseController.getClientsInfo();
  res.json({
    success: true,
    data: {
      connected_clients: clientsInfo.length,
      clients: clientsInfo
    }
  });
});

module.exports = router;