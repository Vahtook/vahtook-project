const { executeQuery } = require('../database/connection');
const bcrypt = require('bcryptjs');

class Admin {
  // Create a new admin
  static async create(adminData) {
    const { username, email, password, full_name, role = 'admin' } = adminData;
    
    try {
      // Hash password
      const saltRounds = 10;
      const password_hash = await bcrypt.hash(password, saltRounds);
      
      const query = `
        INSERT INTO admins (username, email, password_hash, full_name, role)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      const result = await executeQuery(query, [username, email, password_hash, full_name, role]);
      
      if (result.success) {
        return { success: true, adminId: result.data.insertId };
      }
      
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Find admin by email
  static async findByEmail(email) {
    const query = `
      SELECT id, username, email, password_hash, full_name, role, is_active, created_at
      FROM admins 
      WHERE email = ? AND is_active = TRUE
    `;
    
    const result = await executeQuery(query, [email]);
    
    if (result.success && result.data.length > 0) {
      return { success: true, admin: result.data[0] };
    }
    
    return { success: false, error: 'Admin not found' };
  }

  // Find admin by username
  static async findByUsername(username) {
    const query = `
      SELECT id, username, email, password_hash, full_name, role, is_active, created_at
      FROM admins 
      WHERE username = ? AND is_active = TRUE
    `;
    
    const result = await executeQuery(query, [username]);
    
    if (result.success && result.data.length > 0) {
      return { success: true, admin: result.data[0] };
    }
    
    return { success: false, error: 'Admin not found' };
  }

  // Find admin by ID
  static async findById(id) {
    const query = `
      SELECT id, username, email, full_name, role, is_active, created_at
      FROM admins 
      WHERE id = ? AND is_active = TRUE
    `;
    
    const result = await executeQuery(query, [id]);
    
    if (result.success && result.data.length > 0) {
      return { success: true, admin: result.data[0] };
    }
    
    return { success: false, error: 'Admin not found' };
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  }

  // Get all admins
  static async getAll() {
    const query = `
      SELECT id, username, email, full_name, role, is_active, created_at
      FROM admins 
      ORDER BY created_at DESC
    `;
    
    const result = await executeQuery(query);
    
    if (result.success) {
      return { success: true, admins: result.data };
    }
    
    return { success: false, error: result.error };
  }

  // Update admin
  static async update(id, updateData) {
    const allowedFields = ['username', 'email', 'full_name', 'role', 'is_active'];
    const updateFields = [];
    const updateValues = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }
    
    if (updateFields.length === 0) {
      return { success: false, error: 'No valid fields to update' };
    }
    
    updateValues.push(id);
    
    const query = `
      UPDATE admins 
      SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, updateValues);
    
    if (result.success) {
      return { success: true, message: 'Admin updated successfully' };
    }
    
    return { success: false, error: result.error };
  }

  // Delete admin (soft delete)
  static async delete(id) {
    const query = `
      UPDATE admins 
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const result = await executeQuery(query, [id]);
    
    if (result.success) {
      return { success: true, message: 'Admin deleted successfully' };
    }
    
    return { success: false, error: result.error };
  }
}

module.exports = Admin;