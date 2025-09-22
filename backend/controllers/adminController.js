const Admin = require('../models/Admin');
const { generateToken } = require('../middleware/auth');

class AdminController {
  // Admin login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find admin by email
      const adminResult = await Admin.findByEmail(email);
      
      if (!adminResult.success) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const admin = adminResult.admin;

      // Verify password
      const isPasswordValid = await Admin.verifyPassword(password, admin.password_hash);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate JWT token
      const token = generateToken(admin.id, admin.username, admin.role);

      // Remove password hash from response
      const { password_hash, ...adminData } = admin;

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          admin: adminData,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get current admin profile
  static async getProfile(req, res) {
    try {
      res.json({
        success: true,
        data: {
          admin: req.admin
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create new admin (super admin only)
  static async createAdmin(req, res) {
    try {
      const { username, email, password, full_name, role } = req.body;

      // Validate input
      if (!username || !email || !password || !full_name) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, password, and full name are required'
        });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findByEmail(email);
      if (existingAdmin.success) {
        return res.status(409).json({
          success: false,
          message: 'Admin with this email already exists'
        });
      }

      // Create new admin
      const result = await Admin.create({
        username,
        email,
        password,
        full_name,
        role: role || 'admin'
      });

      if (result.success) {
        res.status(201).json({
          success: true,
          message: 'Admin created successfully',
          data: {
            adminId: result.adminId
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }

    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all admins (super admin only)
  static async getAllAdmins(req, res) {
    try {
      const result = await Admin.getAll();

      if (result.success) {
        res.json({
          success: true,
          data: {
            admins: result.admins
          }
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.error
        });
      }

    } catch (error) {
      console.error('Get all admins error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update admin
  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Remove sensitive fields that shouldn't be updated via this endpoint
      const { password, password_hash, ...safeUpdateData } = updateData;

      const result = await Admin.update(id, safeUpdateData);

      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }

    } catch (error) {
      console.error('Update admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete admin (super admin only)
  static async deleteAdmin(req, res) {
    try {
      const { id } = req.params;

      // Prevent self-deletion
      if (parseInt(id) === req.admin.id) {
        return res.status(400).json({
          success: false,
          message: 'You cannot delete your own account'
        });
      }

      const result = await Admin.delete(id);

      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.error
        });
      }

    } catch (error) {
      console.error('Delete admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Verify token endpoint
  static async verifyToken(req, res) {
    try {
      // If we reach here, token is valid (middleware already verified it)
      res.json({
        success: true,
        message: 'Token is valid',
        data: {
          admin: req.admin
        }
      });
    } catch (error) {
      console.error('Verify token error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AdminController;