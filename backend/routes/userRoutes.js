const express = require("express");
const { registerUser, getAllUsers } = require("../controllers/userController");

const router = express.Router();

// POST /api/users/register
router.post("/register", registerUser);

// GET /api/users
router.get("/", getAllUsers);

module.exports = router;
