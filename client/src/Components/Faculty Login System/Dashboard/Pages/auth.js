const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const path = require("path");
require("../db/conn");
const User = require("../models/userschema");
const TechnicalStaffUser = require("../models/technicalstaffschema");

router.post("/register", async (req, res) => {
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
    } = req.body;

    if (
      !userid ||
      !email ||
      !firstname ||
      !lastname ||
      !phone ||
      !password ||
      !cpassword ||
      !position
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
      });
      //Decreption/hashing of password in userschema file
      await user.save();
      res.status(201).json({ message: "Successfully Registered" });
    }
  } catch (err) {
    console.log(err);
  }
});

//User Registration
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, phone, work, password, cpassword } = req.body;

//     if (!name || !email || !phone || !work || !password || !cpassword) {
//       return res.status(422).json({ error: "Please Fill all property" });
//     }

//     const userExist = await User.findOne({ email: email });

//     if (userExist) {
//       return res.status(403).json({ error: "User already exixt" });
//     } else if (password != cpassword) {
//       return res.status(401).json({ error: "Passwords not matching" });
//     } else {
//       const user = new User({ name, email, phone, work, password, cpassword });
//       //Decreption/hashing of password in userschema file
//       await user.save();
//       res.status(201).json({ message: "Successfully Registered" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

//User Login
router.post("/signin", async (req, res) => {
  try {
    let token;
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
        expires: new Date(Date.now() + 900000000),
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
  } catch (err) {
    console.log(err);
  }
});

// Dashboard Page
router.get("/dashboard", authenticate, (req, res) => {
  console.log("hello from inside user dashboard");
  res.send(req.rootUser);
});

//Admin Panel Page
router.get("/adminpanel", authenticate, (req, res) => {
  console.log("hello from inside admin");
  res.send(req.rootUser);
});

//Get Data
router.get("/getuserdata", authenticate, (req, res) => {
  console.log("hello from inside get data");
  res.send(req.rootUser);
});

//Delete Account
router.delete("/deleteaccount/:id", async (req, res) => {
  try {
    console.log("hello from inside delete");
    const data = req.params.id;
    const uid = await User.findOne({ userid: data });
    if (!uid) {
      return res.status(401).send("Account Not found");
    } else {
      const uidd = await User.deleteOne({ userid: data });
      if (uidd) {
        return res.status(201).send("Account Deleted");
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
//Logout
router.get("/logout", (req, res) => {
  console.log("hello from inside logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

// Send Data to Website Directly

// ASH DATA
router.get("/getashdatatowebsite", async (req, res) => {
  console.log("hello from inside data to user website");
  try {
    const userid = await User.find({
      department: "Applied Science and Humanities",
    });
    res.status(200).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});
// CSE DATA
router.get("/getcsedatatowebsite", async (req, res) => {
  console.log("hello from inside data to user website");
  try {
    const userid = await User.find({
      department: "Computer Science and Engineering",
    });
    res.status(200).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});
// ECE DATA
router.get("/getecedatatowebsite", async (req, res) => {
  console.log("hello from inside data to user website");
  try {
    const userid = await User.find({
      department: "Electronics Engineering",
    });
    res.status(200).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});
// EE DATA
router.get("/geteedatatowebsite", async (req, res) => {
  console.log("hello from inside data to user website");
  try {
    const userid = await User.find({
      department: "Electrical Engineering",
    });
    res.status(200).send(userid);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit Account Details
router.post("/updateuserdetails", authenticate, async (req, res) => {
  console.log("hello from update get data");
  try {
    const userDetails = await User.findByIdAndUpdate(
      { _id: req.userID },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Successfully  Account Details Saved" });
  } catch (err) {
    console.log(err);
  }
});

//Add Qualifications
router.post("/qualification", authenticate, async (req, res) => {
  try {
    const { degree, university_college, specialization, year } = req.body;
    const userQuali = await User.findOne({ _id: req.userID });
    if (!degree || !university_college || !specialization || !year) {
      return res.status(403).json("Please Fill all Details");
    }
    if (userQuali) {
      const addquali = await User.updateOne(
        { _id: req.userID },
        {
          $push: {
            qualifications: {
              degree,
              university_college,
              specialization,
              year,
            },
          },
        }
      );

      const data = await userQuali.save();
      return res.status(201).send("Added Successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

//Send Qualification Details
router.get("/getuserqualidata", authenticate, (req, res) => {
  console.log("hello from inside get Qulai data");
  res.send(req.rootUser.qualifications);
});
//Delete Qualification Details
router.delete("/deletequalification/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside delete Quali");

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID },
      {
        $pull: { qualifications: { _id: data } },
      }
    );
    res.status(201).json("Item Deleted");
  } catch (err) {
    console.log(err);
  }
});

//Update Qualification Details
router.put("/updatequalification/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside update Quali");
    const { degree, university_college, specialization, year } = req.body;
    if (!degree || !university_college || !specialization || !year) {
      return res.status(403).json("Please Fill all property");
    }

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID, "qualifications._id": data },
      {
        $set: {
          "qualifications.$.degree": degree,
          "qualifications.$.university_college": university_college,
          "qualifications.$.specialization": specialization,
          "qualifications.$.year": year,
        },
      }
    );
    return res.status(201).json("Item updated");
  } catch (err) {
    console.log(err);
  }
});

//Add Area Of Interest
router.post("/areaofintrests", authenticate, async (req, res) => {
  try {
    const { areaofinterest } = req.body;
    const userareaofint = await User.findOne({ _id: req.userID });
    if (!areaofinterest) {
      return res.status(403).json("Please Fill all Details");
    }
    if (userareaofint) {
      const addareaofinterest = await User.updateOne(
        { _id: req.userID },
        {
          $push: {
            areaofinterests: {
              areaofinterest,
            },
          },
        }
      );

      const data = await userareaofint.save();
      return res.status(201).send("Added Successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

//Send Area of Interest Data
router.get("/getareaofintrests", authenticate, (req, res) => {
  console.log("hello from inside get areaofintrests data");
  res.send(req.rootUser.areaofinterests);
});

//Delete Area of Interest Data
router.delete("/deleteareaofintrests/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside delete areaofintrests");

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID },
      {
        $pull: { areaofinterests: { _id: data } },
      }
    );
    res.status(201).json("Item Deleted");
  } catch (err) {
    console.log(err);
  }
});

//Update Area of Interest

router.put("/updateareaofinterests/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside update aoi");
    const { areaofinterest } = req.body;
    if (!areaofinterest) {
      return res.status(403).json("Please Fill all property");
    }

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID, "areaofinterests._id": data },
      {
        $set: {
          "areaofinterests.$.areaofinterest": areaofinterest,
        },
      }
    );
    return res.status(201).json("Item updated");
  } catch (err) {
    console.log(err);
  }
});

//Add Achivememts
router.post("/achivements", authenticate, async (req, res) => {
  try {
    const { achivement } = req.body;
    const userareaofint = await User.findOne({ _id: req.userID });
    if (!achivement) {
      return res.status(403).json("Please Fill all Details");
    }
    if (userareaofint) {
      const addachivements = await User.updateOne(
        { _id: req.userID },
        {
          $push: {
            achivements: {
              achivement,
            },
          },
        }
      );

      const data = await userareaofint.save();
      return res.status(201).send("Added Successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

//Send Achivememts
router.get("/getachivements", authenticate, (req, res) => {
  console.log("hello from inside get achivements data");
  res.send(req.rootUser.achivements);
});

//Delete Achivements

router.delete("/deleteachivements/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside delete achivements");

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID },
      {
        $pull: { achivements: { _id: data } },
      }
    );
    res.status(201).json("Item Deleted");
  } catch (err) {
    console.log(err);
  }
});

//Update Achivements

router.put("/updateachivements/:id", authenticate, async (req, res) => {
  try {
    console.log("hello from inside achivements aoi");
    const { achivement } = req.body;
    if (!achivement) {
      return res.status(403).json("Please Fill all property");
    }

    const data = req.params.id;
    const deletequali = await User.updateOne(
      { _id: req.userID, "achivements._id": data },
      {
        $set: {
          "achivements.$.achivement": achivement,
        },
      }
    );
    return res.status(201).json("Item updated");
  } catch (err) {
    console.log(err);
  }
});

//Chnage Password
router.put("/changepassword", authenticate, async (req, res) => {
  try {
    console.log("hello from inside pass change ");
    const { oldpassword, newpassword, cnewpassword } = req.body;
    if (!oldpassword || !newpassword || !cnewpassword) {
      return res.status(422).json({ error: "Please Fill all property" });
    }
    const isMatch = await bcrypt.compare(oldpassword, req.rootUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "old Password is Not Correct" });
    }
    if (newpassword !== cnewpassword) {
      return res.status(401).json({ error: "new password is not matched" });
    }
    const userDetails = await User.findByIdAndUpdate(
      { _id: req.userID },
      {
        password: await bcrypt.hash(newpassword, 12),

        cpassword: await bcrypt.hash(cnewpassword, 12),
      },
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Successfully  Change Password" });
  } catch (err) {
    console.log(err);
  }
});

//Add Technical Staff
router.post("/technicalstaff", async (req, res) => {
  try {
    const {
      userid,
      email,
      firstname,
      lastname,
      phone,
      position,
      associatedlab,
    } = req.body;

    if (
      !userid ||
      !email ||
      !firstname ||
      !lastname ||
      !phone ||
      !position ||
      !associatedlab
    ) {
      return res.status(403).json({ error: "Please Fill required property" });
    }
    const userExist1 = await TechnicalStaffUser.findOne({ email: email });
    const userExist2 = await TechnicalStaffUser.findOne({ userid: userid });

    if (userExist2) {
      return res.status(401).json({ error: "userid not available" });
    }
    if (userExist1) {
      return res.status(400).json({ error: "email already exist" });
    }
    const user = new TechnicalStaffUser({
      userid,
      email,
      firstname,
      lastname,
      phone,
      position,
      associatedlab,
    });
    await user.save();
    res.status(201).json({ message: "Successfully Registered" });
  } catch (err) {
    console.log(err);
  }
});

//Delete Technical Staff
router.delete("/deletetechnicalstaff/:id", async (req, res) => {
  try {
    console.log("hello from inside Staff delete");
    const data = req.params.id;
    const uid = await TechnicalStaffUser.findOne({ userid: data });
    if (!uid) {
      return res.status(401).send("Account Not found");
    } else {
      const uidd = await TechnicalStaffUser.deleteOne({ userid: data });
      if (uidd) {
        return res.status(201).send("Account Deleted");
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
//upload Profile Image
router.put(
  "/updateprofileimg",
  upload.single("profileimg"),
  authenticate,
  async (req, res) => {
    console.log("hello from update profile img");
    try {
      const profilepic = req.file.path;
      console.log(profilepic);

      const userDetails = await User.findByIdAndUpdate(
        { _id: req.userID },
        { profileimg: profilepic }
      );
      res.status(201).json({ message: "Successfully  Profile Uploaded" });
    } catch (err) {
      console.log(err);
    }
  }
);
// upload Profile Image
router.put(
  "/updateresume",
  upload.single("resume"),
  authenticate,
  async (req, res) => {
    console.log("hello from update resume");
    try {
      const resume = req.file.path;
      console.log(resume);

      const userDetails = await User.findByIdAndUpdate(
        { _id: req.userID },
        { resume: resume }
      );
      res.status(201).json({ message: "Successfully  Profile Uploaded" });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
