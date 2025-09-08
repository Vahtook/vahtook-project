// Dummy data storage (in-memory)
let users = [];

// Register a new user
const registerUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully", user: newUser });
};

// Get all users
const getAllUsers = (req, res) => {
  res.json(users);
};

module.exports = { registerUser, getAllUsers };
