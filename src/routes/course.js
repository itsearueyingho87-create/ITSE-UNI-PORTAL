const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET courses for current student
router.get('/', auth, async (req,res) => {
  res.json(req.user.courses || []);
});

// POST add a course (student registers a course)
router.post('/', auth, async (req,res) => {
  const { code, title, credits, lecturer } = req.body;
  try {
    const user = await User.findById(req.user._id);
    user.courses.push({ code, title, credits, lecturer });
    await user.save();
    res.json({ message: 'Course added', courses: user.courses });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE course by id (course subdocument id)
router.delete('/:courseId', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user._id);
    user.courses.id(req.params.courseId).remove();
    await user.save();
    res.json({ message: 'Course removed', courses: user.courses });
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
