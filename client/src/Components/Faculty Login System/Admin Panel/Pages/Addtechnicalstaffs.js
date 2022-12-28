import React, { useState } from "react";
import "./Addtechnicalstaffs.css";
import axios from "axios";
const Addtechnicalstaffs = () => {
  const [staffuser, setstaffuser] = useState({
    userid: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    position: "",
    associatedlab: "",
  });
  const resetForm = (e) => {
    e.preventDefault();
    setstaffuser({
      userid: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      position: "",
      associatedlab: "",
    });
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setstaffuser({ ...staffuser, [name]: value });
  };

  const addTechnicalStaff = async (e) => {
    try {
      e.preventDefault();
      const {
        userid,
        email,
        firstname,
        lastname,
        phone,
        position,
        associatedlab,
      } = staffuser;
      const res = await axios.post("/technicalstaff", {
        userid,
        email,
        firstname,
        lastname,
        phone,
        position,
        associatedlab,
      });
      if (res.status === 201) {
        window.alert("Added Sucessfully");
        setstaffuser({
          userid: "",
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          position: "",
          associatedlab: "",
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        window.alert("Please Fill All Details");
      } else if (err.response.status === 401) {
        window.alert("User Id Not Available");
      } else if (err.response.status === 400) {
        window.alert("Email Id Already Exist");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="addstaffs">
        <div className="content">
          <div className="heading">Add New Technical Staff</div>
          <form method="POST" className="addstaffs_form">
            <div className="input_section">
              <div className="form-group">
                <label htmlFor="userid">User ID*</label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your User Id"
                  value={staffuser.userid}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Email"
                  value={staffuser.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name*</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Firstname"
                  value={staffuser.firstname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name*</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Lastname"
                  value={staffuser.lastname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Phone"
                  value={staffuser.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position*</label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Position"
                  value={staffuser.position}
                />
              </div>
              <div className="form-group">
                <label htmlFor="associatedlab">Associated Lab:*</label>
                <input
                  type="text"
                  name="associatedlab"
                  id="associatedlab"
                  autoComplete="off"
                  onChange={handleInputs}
                  placeholder="Your Associated Lab:"
                  value={staffuser.associatedlab}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="register"
                id="register"
                className="form_submit"
                value="Add"
                onClick={addTechnicalStaff}
              />
              <input
                type="reset"
                className="form_reset"
                value="Reset"
                onClick={resetForm}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addtechnicalstaffs;
