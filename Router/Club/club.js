
const express = require('express');
const router = express.Router();
const ClubModal = require('../../schema/ClubOwnerSchema');
const DJModal = require('../../schema/DJSchema');


router.post('/addclubs', async (req, res) => {
    try {
      const { clubMobile, clubEmail } = req.body;
  
      // Check if clubMobile or clubEmail already exist
      const existingClubMobile = await ClubModal.findOne({ clubMobile });
      const existingClubEmail = await ClubModal.findOne({ clubEmail });
  
      if (existingClubMobile || existingClubEmail) {
        // Club with the provided mobile or email already exists
        return res.json({ error: 'Club with the provided mobile or email already exists',success:false });
      }
  
      // Create a new club if no existing club with the provided mobile or email
      const newClub = await ClubModal.create(req.body);
      res.status(201).json({newClub,success:true});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message,success:null });
    }
  });
// Get all clubs
router.get('/getclubs', async (req, res) => {
  try {
    const clubs = await ClubModal.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific club by ID
router.get('/getoneclubs/:id', async (req, res) => {
  try {
    const club = await ClubModal.findById(req.params.id);
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a club by ID
router.put('/updclubs/:id', async (req, res) => {
  try {
    const updatedClub = await ClubModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedClub) {
      res.json(updatedClub);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a club by ID
router.delete('/delclubs/:id', async (req, res) => {
  try {
    const deletedClub = await ClubModal.findByIdAndDelete(req.params.id);
    if (deletedClub) {
      res.json({ message: 'Club deleted successfully' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to check if a club is verified by its ID
router.get('/check-verification/:clubEmail', async (req, res) => {
    const { clubEmail } = req.params;
  
    try {
      // Find the club by ID
      const club = await ClubModal.findOne({clubEmail});
  
      // Check if the club exists
      if (!club) {
        return res.json({ message: 'Club not found' });
      }
  
         res.json({ isVerified : club.isVerified,clubId:club._id});
     
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Login route
router.post('/login', async (req, res) => {
    const { clubIdOrEmail, password } = req.body;
  
    try {
      // Check if the input is an email or clubId
      const isEmail = clubIdOrEmail.includes('@');
      let query;
  
      if (isEmail) {
        query = { clubEmail: clubIdOrEmail };
      } else {
        query = { clubId: clubIdOrEmail };
      }
  
      // Find the club in the database
      const club = await ClubModal.findOne(query);
  
      // Check if the club exists and if the password is correct
      if (club && club.password === password) {
        // Check if the club is verified
     console.log(club.isVerified);
        if (club.isVerified=== false) {
          return res.json({ message: 'Club is not verified' ,success:false});
        }
        else
        return res.status(200).json({ message: 'Login successful',club,success:true });
      } else {
        return res.json({ message: 'Invalid credentials' ,success:false});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


  // Create a route to add a DJ to the club
router.post('/adddj', async (req, res) => {
    try {
      // Extract data from the request body
      const { DjName, ClubID, DjNumber, Djpassword, clubEmail } = req.body;
  
      // Create a new DJ instance
      const newDj = new DJModal({
        DjName,
        ClubID,
        DjNumber,
        Djpassword,
        clubEmail,
      });
  
      // Save the DJ to the database
      await newDj.save();
  
      // Respond with success and a message
      res.json({ success: true, message: 'DJ added successfully' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


module.exports = router;