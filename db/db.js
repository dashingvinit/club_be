const mongoose = require('mongoose');
const db = "mongodb+srv://club-nights:club-nights-1234@club-nights.dhyzm6b.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection Success");
  })
  .catch(err => {
    console.log("Connection Error");
  });
