const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userid: {
    type: String,
    require: true,
    unique: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  associatedlab: {
    type: String,
    require: true,
  },
});

const Technicalstaff = mongoose.model("TechnicalStaff", userSchema);

module.exports = Technicalstaff;
