const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Event = require('../models/Event');

// @route   POST /api/events/create
// @desc    Create a new event
router.post('/create', auth, async (req, res) => {
  try {
    const { title, description, date, location, imageUrl } = req.body;

    const newEvent = new Event({
      clubId: req.user.clubId, // Use clubId instead of id (assuming req.user populated from token has clubId)
      title,
      description,
      date,
      location,
      imageUrl
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events
// @desc    Get ALL events (Sorted by closest upcoming date)
router.get('/', async (req, res) => {
  try {
    // Get events greater than or equal to Today (future events only)
    // Populate 'clubId' to get the club name and logo
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .populate('clubId', 'name logoUrl');
      
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Check ownership (Club Owner OR Super Admin)
    // Note: event.clubId is an ObjectId, req.user.clubId is string from token
    if (event.clubId.toString() !== req.user.clubId && req.user.role !== 'super_admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.deleteOne();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/my-events
// @desc    Get only the logged-in club's events
router.get('/my-events', auth, async (req, res) => {
  try {
    const events = await Event.find({ clubId: req.user.clubId }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
