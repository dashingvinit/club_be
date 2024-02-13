// routes/paymentWaitingRoutes.js

const express = require('express');
const paymentWaitingModal = require('../../schema/PaymentWaitingSchema');
const  axios = require('axios');
const router = express.Router();

// API to create a payment waiting entry
router.post('/create-payment-waiting', async (req, res) => {
    try {
      const { SongReqList, djID,paymentWaitingStartTimeing, paymentWaitingEndTiming} = req.body;

      const processedData = await Promise.all(SongReqList.map(async (songReq) => {
        const { songname, songlink, optionalurl, announcement, bookingPrice, userMobile } = songReq;
  
        const MUID = "MUID" + userMobile;
        const TUID = djID+"TUID" + userMobile;
        
        const additionalData = await axios.post('http://localhost:5000/pay/payment', {
          MUID: MUID,
          transactionId: TUID,
          name: "User" + userMobile,
          amount: bookingPrice,
          mobileNumber: userMobile,
        });
  
        const redirectURI = additionalData.data.redirectTo;
  
        const finalData = {
          songname,
          songlink,
          optionalurl,
          announcement,
          bookingPrice,
          userMobile,
          MUID: MUID,
          transactionId: TUID,
          djId: djID,
          paymentWaitingLink: redirectURI,
        };
  
        return finalData;
      }));
  
      const savedData = await paymentWaitingModal.create({ 
        SongReqList: processedData,
        paymentWaitingStartTimeing,
        paymentWaitingEndTiming,
        djId: djID,
      });
  
      res.status(201).json(savedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/saveLatestToAccepted', async (req, res) => {
    try {
      // Fetch the latest paymentWaitingData based on djId and sorted by date
      const paymentWaitingData = await paymentWaitingModal.findOne({ 'djId': req.body.djId }).sort({ 'date': -1 });
  
      // Fetch the latest DJPortalModal based on djId and sorted by date
      const djPortal = await DJPortalModal.findOne({ 'DJId': req.body.djId }).sort({ 'date': -1 });
  
      // Check if both documents exist
      if (!paymentWaitingData || !djPortal) {
        return res.status(404).json({ message: "No data found" });
      }
  
      // Extract accepted songs from paymentWaitingData
      const acceptedSongs = paymentWaitingData.SongReqList.filter(song => song.paymentWaitingstatus === true);
  
      // Add accepted songs to DJPortalModal
      djPortal.AcceptedSongs.push(...acceptedSongs);
  
      // Save to database
      const savedData = await djPortal.save();
  
      // Set paymentWaitingstatus to false for accepted songs in paymentWaitingModal
      paymentWaitingData.SongReqList.forEach(song => {
        if (song.paymentWaitingstatus === true) {
          song.paymentWaitingstatus = false;
        }
      });
      await paymentWaitingData.save();
  
      res.status(200).json(savedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.get('/get-payment-timings/:djId', async (req, res) => {
    try {
      const { djId } = req.params;
  
      // Find the last document in the database based on the provided djId
      const lastPaymentData = await paymentWaitingModal.findOne({ djId }).sort({ date: -1 });
  
      if (!lastPaymentData) {
        return res.status(404).json({ message: 'No payment data found for the provided DJ ID' });
      }
  
      // Extract paymentWaitingStartTimeing and paymentWaitingEndTiming from the last document
      const { paymentWaitingStartTimeing, paymentWaitingEndTiming } = lastPaymentData;
  
      res.status(200).json({ paymentWaitingStartTimeing, paymentWaitingEndTiming });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
   
 
// API to get payment waiting details by phone number
router.get('/payment-waiting/:djId/:userMobile', async (req, res) => {
    const { djId, userMobile } = req.params;
    try {
      const userData = await paymentWaitingModal.findOne({ 'SongReqList.userMobile': userMobile, 'SongReqList.djId': djId })
        .sort({ date: -1 }); // Sort by date in descending order (latest first)
      if (!userData) {
        return res.status(404).json({ message: 'User data not found' });
      }
      // Extracting only relevant SongReqList for the user and dj
      const userSongReqList = userData.SongReqList.filter(song => song.userMobile === userMobile && song.djId.toString() === djId);
      return res.send({ userSongReqList, date: userData.paymentWaitingEndTiming });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.get('/songs/:userMobile', async (req, res) => {
    const { userMobile } = req.params;
  
    try {
      // Find documents in the paymentWaitingModal collection with the provided userMobile
      const songLists = await paymentWaitingModal.find({ 'SongReqList.userMobile': userMobile });
  
      res.json(songLists);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/payfind/:txind', async (req, res) => {
    const { txind } = req.params;
  
    try {
      // Find documents in the paymentWaitingModal collection with the provided userMobile
      const existingPayment = await paymentWaitingModal.findOne({
        'SongReqList.transactionId': txind,
        'SongReqList.paymentWaitingstatus': false
    }).sort({date : -1});

      res.json(existingPayment);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
