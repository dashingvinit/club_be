const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const paymentSchema = new mongoose.Schema({
 
      name:{
        type: String,
        required: true,
      },

      
      mobileNumber: {
        type: String, 
        required: true,
      },
   
     MUID:{
    type: String,
    required: true,
        },

   transactionId:{
    type: String,
    required: true,
    },


djId :{
    
    type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'DJModal', // Reference the djModal model
        required: true,

},


SongReqList:[{
 
  songname: {
    type: String,
    required: true,

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
DJPortalStartTimeing:{
  type: String,

},
paymentstatus:{
    type: Boolean,
     default:false
},

  date: {
    type: Date,
    default: Date.now,
  },

});


const paymentModal = mongoose.model('paymentModal', paymentSchema);
module.exports = paymentModal;
>>>>>>> 6d2cebb4298c57ae83221f0f748cc3966f4ff89c
