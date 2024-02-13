const mongoose = require('mongoose'), Schema = mongoose.Schema ;
const DJPortalSchema = new mongoose.Schema({

DJId: [{ type: Schema.Types.ObjectId, ref: 'DJModal' }],

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
  AcceptedSongs: [{
    songname: {
      type: String,
  
    },
    announcement:{
      type: String,
  
    },
    songlink: {
      type: String,
    },
    optionalurl:{
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

  DJPortalStartTimeing: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
  },
 
  TotalSongs :{
    type: Number,
    required: true,
  },
  price :{
    type: Number,
    required: true,
  },
  DJPortalEndTiming:{
    type: String,
  },
 
  date: {
    type: Date,
    default: Date.now,
  },

});

DJPortalSchema.methods.updateBookingPrice = function () {
  const portalPrice = this.price;
  this.SongReqList.forEach(song => {
      if (song.bookingPrice < portalPrice) {
          song.bookingPrice = portalPrice;
      }
  });
};

const DJPortalModal = mongoose.model('DJPortalModal', DJPortalSchema);
module.exports = DJPortalModal;
