const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB = process.env.DATABASE;

//Connection to mongodb
mongoose.connect(DB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});
