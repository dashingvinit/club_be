const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    djId: {
        type: String,
        required: true,
    },
    SongReqList:[{
 
        songname: {
          type: String,
         
      
        },
        songlink: {
          type: String,
        },
        optionalurl:{
          type: String,
      
        },
        announcement:{
          type: String,
      
        },
        bookingPrice: {
          type: Number,
          required: true
      
        },
        
        userMobile:{
          type: String,
          required: true
      
        },
      
       
      }],
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'success', 'failure'], 
        default: 'pending',
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
    
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
