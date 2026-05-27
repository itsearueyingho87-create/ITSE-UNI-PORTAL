const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/students/me
router.get('/me', auth, async (req, res) => {
  // req.user is set by auth middleware (excluding password)
  res.json(req.user);
});

// PUT /api/students/me  -> update profile
router.put('/me', auth, async (req, res) => {
  const { name, email, matricNumber, level } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).json({ message: 'User not found' });

    if(name) user.name = name;
    if(email) user.email = email;
    if(matricNumber) user.matricNumber = matricNumber;
    if(level) user.level = level;

    await user.save();
    res.json({ message: 'Profile updated', user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }) });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
