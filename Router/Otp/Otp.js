const express = require('express');
const router = express.Router();

const twilio = require('twilio');
const otpModal = require('../../schema/OTPSchema');
//send otp by mobile 

const accountSid = 'ACf4655a7566fb2d15552677c2c20e749b';
const authToken = '90a77b7c902fd4be193cfc54c50142a6';
const twilioClient = twilio(accountSid, authToken);

// Generate a random 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

router.post('/send-otp-mobile', (req, res) => {
  const { to } = req.body;
  

  if (!to) {
    return res.status(400).json({ error: 'Missing "to" field in the request body' });
  }

  const otp = generateOTP();
  const message = `Welcome to Club Nights 🎉 Play the best song of your choices using Club Nights. Your OTP for verification is ${otp}`;

  twilioClient.messages
    .create({
      body: message,
      messagingServiceSid: 'MGec7786a24c26500bb84549853d7a3b3e',
      to: to
    })
    .then(async(message) => {
      console.log(`OTP sent to ${to}: ${message.sid}`);
      const saveOtpStatus = new otpModal({otp:otp,otpMobile:to});
        await saveOtpStatus.save();
          
      res.json({ message: 'OTP sent successfully',success:true });
    })
    .catch(error => {
      console.error(`Error sending OTP to ${to}: ${error.message}`);
      res.status(500).json({ error: 'Failed to send OTP' ,success:false});
    });
});

// verify otp 
 
router.post('/verify-otp',async(req,res)=>{
  const {otpMobile,otp} = req.body;
  const latestData = await otpModal.findOne({ otpMobile }).sort({ date: -1 });
      if(latestData.otp === otp){
        res.send({status : true})
      }
      else{
        res.send({status : false})

      }
})
module.exports = router;