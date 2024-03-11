const express = require('express');
<<<<<<< HEAD
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
=======
const userModal = require('../../schema/UserSchema');
const router = express.Router();
// API endpoint to save userMobile
router.post('/saveUserMobile', async (req, res) => {
  try {
    const { userMobile } = req.body;

    // Check if userMobile already exists
    const existingUser = await userModal.findOne({ userMobile });

    if (existingUser) {
      return res.status(400).json({ message: 'UserMobile already exists' });
    }

    // If userMobile doesn't exist, save it
    const newUser = new userModal({ userMobile });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
>>>>>>> 6d2cebb4298c57ae83221f0f748cc3966f4ff89c
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
<<<<<<< HEAD
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
  
=======
    const users = await userModal.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userModal.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await userModal.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await userModal.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
>>>>>>> 6d2cebb4298c57ae83221f0f748cc3966f4ff89c

module.exports = router;
