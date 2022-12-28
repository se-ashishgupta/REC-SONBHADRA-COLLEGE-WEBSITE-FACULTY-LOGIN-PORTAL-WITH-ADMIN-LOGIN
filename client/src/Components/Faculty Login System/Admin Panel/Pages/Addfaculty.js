import React, { useState } from "react";
import "./Addfaculty.css";

const Addfaculty = () => {
  const [user, setuser] = useState({
    userid: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    cpassword: "",
    position: "",
    department: "",
  });

  const inputHandles = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

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
    } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        email,
        firstname,
        lastname,
        phone,
        password,
        cpassword,
        position,
        department,
      }),
    });

    const data = await res.json();

    if (res.status === 422) {
      window.alert("Please Fill All Details");
      console.log("Please Fill All Details");
    } else if (!data) {
      window.alert("Invalid Credentials");
    } else if (res.status === 403) {
      window.alert("User already Exixt");
    } else if (res.status === 404) {
      window.alert("UserId Unavailable");
    } else if (res.status === 401) {
      window.alert("Password Not Matched");
    } else {
      window.alert("Successfully Registration");
      console.log("Successfully Registration");
      setuser({
        userid: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        password: "",
        cpassword: "",
        position: "",
      });
    }
  };

  return (
    <>
      <div className="addfaculty">
        <div className="content">
          <div className="heading">Add New Faculty</div>
          <form method="POST" className="addfaculty_from">
            <div className="input_section">
              <div className="form-group">
                <label htmlFor="userid">UserID*</label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  autoComplete="off"
                  value={user.userid}
                  onChange={inputHandles}
                  placeholder="Your userid"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={inputHandles}
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name*</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="off"
                  value={user.firstname}
                  onChange={inputHandles}
                  placeholder="Your Firstname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name*</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="off"
                  value={user.lastname}
                  onChange={inputHandles}
                  placeholder="Your Lastname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={inputHandles}
                  placeholder="Your Phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department*</label>

                <select
                  name="department"
                  id="department"
                  value={user.department}
                  onChange={inputHandles}
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
                <label htmlFor="position">Position*</label>

                <select
                  name="position"
                  id="position"
                  value={user.position}
                  onChange={inputHandles}
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
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={inputHandles}
                  placeholder="Your Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password*</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={inputHandles}
                  placeholder="Your Confrim Password"
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="register"
                id="register"
                className="form_submit"
                value="Register"
                onClick={PostData}
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

export default Addfaculty;
