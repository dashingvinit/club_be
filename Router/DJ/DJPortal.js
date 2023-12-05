const express = require('express');
const DJPortalModal = require('../../schema/DJPortalSchema');
const router = express.Router();

// POST endpoint to create a new DJ portal entry
router.post('/start', async (req, res) => {
  try {
    const {
      DJId,
      DJPortalStartTimeing,
      TotalSongs,
      price,
      DJPortalEndTiming,
    } = req.body;

    // Create a new DJPortalModal instance
    const newDJPortal = new DJPortalModal({
      DJId,
      DJPortalStartTimeing,
      TotalSongs,
      price,
      DJPortalEndTiming,
    });

    // Save the new DJ portal entry to the database
    const savedDJPortal = await newDJPortal.save();

    res.status(201).json(savedDJPortal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to get all DJPortalModals
router.get('/getall', async (req, res) => {
  try {
    const djPortals = await DJPortalModal.find();
    res.json(djPortals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a specific DJPortalModal by ID
router.get('/getone/:id', async (req, res) => {
  try {
    const djPortal = await DJPortalModal.findById(req.params.id);
    if (!djPortal) {
      return res.status(404).json({ message: 'DJPortalModal not found' });
    }
    res.json(djPortal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route to save AcceptedSongs
router.post('/saveAcceptedSongs/:djId', async (req, res) => {
  const { djId } = req.params;
  const { acceptedSongs } = req.body;

  try {
    // Find the DJPortalModal using the provided DJId
    const djPortal = await DJPortalModal.findOne({ DJId: djId })
    .sort({ createdAt: -1 })
    .exec();
    
    if (!djPortal) {
      return res.status(404).json({ error: 'DJ Portal not found' });
    }

    // Add the acceptedSongs to the AcceptedSongs array
    djPortal.AcceptedSongs.push(...acceptedSongs);

    // Save the updated DJPortalModal
    await djPortal.save();

    return res.status(200).json({ message: 'AcceptedSongs saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to save AcceptedSongs
router.post('/saveSelectedSongs/:djId', async (req, res) => {
  const { djId } = req.params;
  const { SongReqList } = req.body;

  try {
    // Find the DJPortalModal using the provided DJId
    const djPortal = await DJPortalModal.findOne({ DJId: djId })
    .sort({ createdAt: -1 })
    .exec();
    
    if (!djPortal) {
      return res.status(404).json({ error: 'DJ Portal not found' });
    }

    // Add the acceptedSongs to the AcceptedSongs array
    djPortal.SongReqList.push(...SongReqList);

    // Save the updated DJPortalModal
    await djPortal.save();

    return res.status(200).json({ message: 'Selected Songs saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to get the latest SongReqList by DJId
router.get('/latestSongReqList/:djId', async (req, res) => {
  try {
    const { djId } = req.params;

    // Find the DJPortalModal document with the specified DJId and sort by date in descending order to get the latest entry
    const latestDJPortal =await DJPortalModal.findOne({ DJId: djId })
    .sort({ createdAt: -1 })
    .exec();

    if (!latestDJPortal) {
      return res.status(404).json({ message: 'No DJ Portal found for the specified DJId' });
    }

    // Extract the latest SongReqList
    const latestSongReqList = latestDJPortal.SongReqList;

    res.json({ latestSongReqList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
