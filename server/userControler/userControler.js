const bcrypt = require("bcryptjs");
const User = require("../models/userschema");
const jwt = require("jsonwebtoken");
const userRegister = async (req, res) => {
  try {
    const {
      userid,
      email,
      firstname,
      lastname,
      phone,
      password,
      cpassword,
      position,
      department,
    } = req.body;

    if (
      !userid ||
      !email ||
      !firstname ||
      !lastname ||
      !phone ||
      !password ||
      !cpassword ||
      !position ||
      !department
    ) {
      return res.status(422).json({ error: "Please Fill all property" });
    }
    const userExist1 = await User.findOne({ email: email });
    const userExist2 = await User.findOne({ userid: userid });

    if (userExist1) {
      return res.status(403).json({ error: "user already exist" });
    } else if (userExist2) {
      return res.status(404).json({ error: "userid unavailable" });
    } else if (password != cpassword) {
      return res.status(401).json({ error: "Passwords not matching" });
    } else {
      const user = new User({
        userid,
        email,
        firstname,
        lastname,
        position,
        phone,
        password,
        cpassword,
        department,
      });
      //Decreption/hashing of password in userschema file
      await user.save();
      res.status(201).json({ message: "Successfully Registered" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please Fill all property" });
    }
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      return res.status(400).json({ error: "Invalid details" });
    }

    if (userLogin.email === "recs") {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //Tokens
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid details" });
      } else {
        res.status(350).json({ message: "Admin Login Successfully" });
      }
    } else if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      //Tokens
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid details" });
      } else {
        res.status(201).json({ message: "Login Successfully" });
      }
    } else {
      return res.status(400).json({ error: "Invalid details" });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { userRegister, userSignin };
