const express = require('express');
const DJModal = require('../../schema/DJSchema');
const router = express.Router();

// Route for DJ login
router.post('/login', async (req, res) => {
  const { DjNumber, Djpassword } = req.body;

  try {
    // Find DJ by DjNumber
    const dj = await DJModal.findOne({ DjNumber });

    // If DJ is not found
    if (!dj) {
      return res.json({ error: 'DJ not found' ,success:false});
    }

    // Check if the password is correct
    if (dj.Djpassword !== Djpassword) {
      return res.json({ error: 'Invalid password',success:false });
    }

    // Set the DJ as live
    dj.statusLive = true;
    await dj.save();

    // You may want to send only specific information back to the client
    const { _id, DjName, DJEmail, statusLive, date } = dj;
    

    // Respond with the DJ information
    res.json({
      success:true,
      _id,
      DjName,
      DJEmail,
      statusLive,
      date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
