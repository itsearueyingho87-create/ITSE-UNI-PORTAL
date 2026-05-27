const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req,res) => res.json(req.user.fees || []));

// Create a new fee record (for admin or student to add)
router.post('/', auth, async (req,res) => {
  const { amount, reference } = req.body;
  const user = await req.user.constructor.findById(req.user._id);
  user.fees.push({ amount, reference, status: 'pending' });
  await user.save();
  res.json({ message: 'Fee record added', fees: user.fees });
});

// Mark as paid (this should integrate with real payment gateway)
router.post('/pay/:feeId', auth, async (req,res) => {
  const user = await req.user.constructor.findById(req.user._id);
  const fee = user.fees.id(req.params.feeId);
  if(!fee) return res.status(404).json({ message: 'Fee not found' });
  fee.status = 'paid';
  await user.save();
  res.json({ message: 'Payment recorded', fees: user.fees });
});

module.exports = router;
