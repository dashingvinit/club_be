const mongoose = require('mongoose');
require('dotenv').config()

const db = process.env.DB || "";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection Success");
  })
  .catch(err => {
    console.log("Connection Error");
  });
