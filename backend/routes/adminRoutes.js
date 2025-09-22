const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const { authenticateToken, requireSuperAdmin } = require('../middleware/auth');

// Public routes
router.post('/login', AdminController.login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, AdminController.getProfile);
router.get('/verify-token', authenticateToken, AdminController.verifyToken);

// Super admin only routes
router.post('/create', authenticateToken, requireSuperAdmin, AdminController.createAdmin);
router.get('/all', authenticateToken, requireSuperAdmin, AdminController.getAllAdmins);
router.put('/:id', authenticateToken, requireSuperAdmin, AdminController.updateAdmin);
router.delete('/:id', authenticateToken, requireSuperAdmin, AdminController.deleteAdmin);

module.exports = router;