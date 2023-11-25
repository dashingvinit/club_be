const mongoose = require('mongoose');

const DJSchema = new mongoose.Schema({
  DjName: {
    type: String,
    required: true,
  },
  ClubID: {
    type: String,
    required: true,
  },
  DjNumber: {
    type: Number,
    required: true,
  },
  Djpassword: {
    type: String,
    required: true,
  },
 DJEmail:{
    type: String,
  },
  
  
  date: {
    type: Date,
    default: Date.now,
  },
  
  

});


const DJModal = mongoose.model('DJModal', DJSchema);
module.exports = DJModal;
