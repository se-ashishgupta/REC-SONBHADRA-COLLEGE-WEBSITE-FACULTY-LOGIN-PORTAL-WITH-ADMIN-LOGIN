import React, { useEffect, useState } from "react";
import "./Account.css";

const Account = () => {
  const [userData, setuserData] = useState({
    userid: "",
    email: "",
    firstname: "",
    lastname: "",
    fathername: "",
    mothername: "",
    gender: "",
    religion: "",
    position: "",
    department: "",
    teachingexperiance: "",
    dob: "",
    joiningdate: "",
    about: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });
  //Get Data Present in DataBase
  const getUserData = async () => {
    try {
      const res = await fetch("/getuserdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setuserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setuserData({ ...userData, [name]: value });
  };

  const saveDetails = async (e) => {
    e.preventDefault();

    const {
      userid,
      email,
      firstname,
      lastname,
      fathername,
      mothername,
      gender,
      religion,
      position,
      department,
      teachingexperiance,
      dob,
      joiningdate,
      about,
      phone,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
    } = userData;

    const res = await fetch("/updateuserdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        email,
        firstname,
        lastname,
        fathername,
        mothername,
        gender,
        religion,
        position,
        department,
        teachingexperiance,
        dob,
        joiningdate,
        about,
        phone,
        address1,
        address2,
        country,
        state,
        city,
        zipcode,
      }),
    });
    const data = await res.json();
    setuserData(data);
    if (res.status === 201) {
      window.alert("Successfully  Account Details Saved");
      console.log("Successfully  Account Details Saved");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div className="editaccount_details">
        <div className="content">
          <div className="heading">
            Edit Account Details <hr />
          </div>
          <form method="POST" className="editaccount_details_from">
            <div className="input_section">
              <div className="form-group">
                <label htmlFor="userid">UserID*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="userid"
                  id="userid"
                  value={userData.userid}
                  placeholder="Your UserId"
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="email"
                  id="email"
                  value={userData.email}
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="firstname"
                  id="firstname"
                  value={userData.firstname}
                  placeholder="Your First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="lastname"
                  id="lastname"
                  value={userData.lastname}
                  placeholder="Your Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fathername">Father Name*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="fathername"
                  id="fathername"
                  value={userData.fathername}
                  placeholder="Your Fathername"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mothername">Mother Name*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="mothername"
                  id="mothername"
                  value={userData.mothername}
                  placeholder="Your Mothername"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender*</label>
                <select
                  name="gender"
                  id="gender"
                  value={userData.gender}
                  onChange={handleInputs}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {/* <input
                  type="text"
                  list="browsers"
                  name="gender"
                  id="gender"
                  onChange={handleInputs}
                  value={userData.gender}
                />
                <datalist id="browsers">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </datalist> */}
              </div>
              <div className="form-group">
                <label htmlFor="religion">Religion*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="religion"
                  id="religion"
                  value={userData.religion}
                  placeholder="Your Religion"
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position*</label>
                <select
                  name="position"
                  id="position"
                  value={userData.position}
                  onChange={handleInputs}
                >
                  <option value="">Select Position</option>
                  <option value="HOD">HOD</option>
                  <option value="HOD and Professor">HOD and Professor</option>
                  <option value="HOD and Assistent Professor">
                    HOD and Assistent Professor
                  </option>
                  <option value="Professor">Professor</option>
                  <option value="Assistent Professor">
                    Assistent Professor
                  </option>
                  <option value="Research Schollar">Research Schollar</option>
                  <option value="Guest Faculty">Guest Faculty</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department*</label>

                <select
                  name="department"
                  id="department"
                  onChange={handleInputs}
                  value={userData.department}
                >
                  <option value="">Select Department</option>
                  <option value="Applied Science and Humanities">
                    Applied Science and Humanities
                  </option>
                  <option value="Computer Science and Engineering">
                    Computer Science and Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="teachingexperiance">Teaching Experiance*</label>
                <input
                  type="number"
                  onChange={handleInputs}
                  name="teachingexperiance"
                  id="teachingexperiance"
                  value={userData.teachingexperiance}
                  placeholder="Your Teaching Experiance"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth*</label>
                <input
                  type="date"
                  onChange={handleInputs}
                  name="dob"
                  id="dob"
                  value={userData.dob}
                  placeholder="Your Date of Birth"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Joining Date*</label>
                <input
                  type="date"
                  onChange={handleInputs}
                  name="joiningdate"
                  id="joiningdate"
                  value={userData.joiningdate}
                  placeholder="Your Joining Date"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="number"
                  onChange={handleInputs}
                  name="phone"
                  id="phone"
                  value={userData.phone}
                  placeholder="Your Phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address1">Address 1*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="address1"
                  id="address1"
                  value={userData.address1}
                  placeholder="Your Address1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address2">Address 2*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="address2"
                  id="address2"
                  value={userData.address2}
                  placeholder="Your Address2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="country"
                  id="country"
                  value={userData.country}
                  placeholder="Your Country"
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="state"
                  id="state"
                  value={userData.state}
                  placeholder="Your state"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="city"
                  id="city"
                  value={userData.city}
                  placeholder="Your City"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipcode">Zip Code*</label>
                <input
                  type="text"
                  onChange={handleInputs}
                  name="zipcode"
                  id="zipcode"
                  value={userData.zipcode}
                  placeholder="Your Zipcode"
                />
              </div>

              <div className="form-group">
                <label htmlFor="about">About*</label>
                <textarea
                  onChange={handleInputs}
                  name="about"
                  id="about"
                  value={userData.about}
                  placeholder="Your About"
                  rows={6}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="register"
                id="register"
                className="form_submit"
                value="Save Details"
                onClick={saveDetails}
              />
              <input
                type="reset"
                name="reset"
                id="reset"
                className="form_reset"
                value="Reset"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Account;
