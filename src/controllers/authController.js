const User = require('../models/user');
const bcrypt = require('bcrypt');

const authController = {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Log in successful - Add your logic here (e.g., session management, JWT generation, etc.)
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async signup(req, res) {
    try {
      const { firstName, lastName, email, phoneNumber , username, password  } = req.body;

      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        username,
        password: hashedPassword,
        
      });

      // Save the new user
      await newUser.save();
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Other controller methods...
};

module.exports = authController;
