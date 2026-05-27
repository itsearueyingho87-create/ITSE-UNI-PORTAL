const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req,res) => res.json(req.user.timetable || []));

router.post('/', auth, async (req,res) => {
  const { day, startTime, endTime, courseCode, location } = req.body;
  const user = await req.user.constructor.findById(req.user._id);
  user.timetable.push({ day, startTime, endTime, courseCode, location });
  await user.save();
  res.json({ message: 'Timetable updated', timetable: user.timetable });
});

router.delete('/:itemId', auth, async (req,res) => {
  const user = await req.user.constructor.findById(req.user._id);
  user.timetable.id(req.params.itemId).remove();
  await user.save();
  res.json({ message: 'Item removed', timetable: user.timetable });
});

module.exports = router;
