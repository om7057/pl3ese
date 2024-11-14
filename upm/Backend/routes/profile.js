const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticate');
const Profile = require('../models/profile');
const User = require('../models/user');
const router = express.Router();

// File upload configuration (multer)
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create or Update Profile
router.post('/', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  const { fullName, phone, address } = req.body;
  const profilePicture = req.file?.path;

  try {
    let profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      profile = await Profile.create({ fullName, phone, address, profilePicture, userId: req.user.id });
    } else {
      await profile.update({ fullName, phone, address, profilePicture });
    }
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: 'Could not save profile' });
  }
});

// Get Profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id }, include: User });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: 'Could not fetch profile' });
  }
});

// Delete Profile
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await Profile.destroy({ where: { userId: req.user.id } });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Could not delete profile' });
  }
});

module.exports = router;
