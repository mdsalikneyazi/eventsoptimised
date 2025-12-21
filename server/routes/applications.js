const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// @route   POST /api/applications/apply
router.post('/apply', async (req, res) => {
  const { clubId, studentName, studentEmail, rollNumber, reason } = req.body;

  try {
    // Check if student already applied
    const existing = await Application.findOne({ clubId, studentEmail });
    if (existing) {
      return res.status(400).json({ msg: 'You have already applied to this club.' });
    }

    const newApp = new Application({
      clubId, studentName, studentEmail, rollNumber, reason
    });

    await newApp.save();
    res.json({ msg: 'Application submitted successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
