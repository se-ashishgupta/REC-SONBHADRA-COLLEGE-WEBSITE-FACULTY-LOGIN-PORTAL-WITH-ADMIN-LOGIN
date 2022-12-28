const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  fathername: String,
  mothername: String,
  gender: String,
  religion: String,
  position: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  teachingexperiance: Number,
  dob: String,
  joiningdate: String,
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cpassword: {
    type: String,
    require: true,
  },
  address1: String,
  address2: String,
  country: String,
  state: String,
  city: String,
  zipcode: Number,

  areaofinterests: [{ areaofinterest: String }],
  achivements: [{ achivement: String }],
  about: String,
  profileimg: String,

  qualifications: [
    {
      degree: {
        type: String,
      },
      university_college: {
        type: String,
      },
      specialization: {
        type: String,
      },
      year: {
        type: String,
      },
    },
  ],
  profileimg: {
    type: String,
  },
  resume: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Decreption/hashing of password

userSchema.pre("save", async function (next) {
  console.log("hi from inside hasing password");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//JWT Token Generating

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER1", userSchema);
// const User = mongoose.model("USER", userSchema);
module.exports = User;
