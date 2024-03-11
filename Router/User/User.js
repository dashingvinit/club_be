const express = require('express');
const UserModal = require('../../schema/UserSchema');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = new UserModal(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModal.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update payment isSuccess to true by UserMobile and transactionId
router.put('/users/:userMobile/payments/:transactionId', async (req, res) => {
    try {
      const { userMobile, transactionId } = req.params;
      const updatedUser = await UserModal.findOneAndUpdate(
        { UserNumber: userMobile, 'payments.transactionsId': transactionId },
        { $set: { 'payments.$.isSuccess': true } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User or payment not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
