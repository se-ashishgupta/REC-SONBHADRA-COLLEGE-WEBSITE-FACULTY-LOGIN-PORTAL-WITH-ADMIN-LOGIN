import React, { useState } from "react";
import "./Style.css";
import {
  RiLockPasswordFill,
  RiAccountPinBoxFill,
  RiPhoneLine,
} from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineWork } from "react-icons/md";
import loginimage from "../Images/Logo/College_logo1.png";
import { useNavigate } from "react-router-dom";
import "./Style.css";
const Facultyregistration = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    userid: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    cpassword: "",
    position: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
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
      navigate("/facultylogin");
    }
  };

  // const [user, setuser] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   work: "",
  //   password: "",
  //   cpassword: "",
  // });

  // let name, value;
  // const handleInputs = (e) => {
  //   console.log(e);
  //   name = e.target.name;
  //   value = e.target.value;
  //   setuser({ ...user, [name]: value });
  // };

  // const PostData = async (e) => {
  //   e.preventDefault();

  //   const { name, email, phone, work, password, cpassword } = user;

  //   const res = await fetch("/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       phone,
  //       work,
  //       password,
  //       cpassword,
  //     }),
  //   });

  //   const data = await res.json();

  //   if (res.status === 422) {
  //     window.alert("Please Fill All Details");
  //     console.log("Please Fill All Details");
  //   } else if (!data) {
  //     window.alert("Invalid Credentials");
  //   } else if (res.status === 403) {
  //     window.alert("User already Exixt");
  //   } else if (res.status === 401) {
  //     window.alert("Password Not Matched");
  //   } else {
  //     window.alert("Successfully Registration");
  //     console.log("Successfully Registration");
  //     navigate("/facultylogin");
  //   }
  // };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login-content">
            <div className="login-image">
              <figure>
                <img src={loginimage} alt="login-img" />
              </figure>
              <h2>Welcome</h2>
            </div>

            <div className="login-form">
              <h2 className="form-title">Faculty Registration</h2>
              <form method="POST" className="userlogin-from">
                <div className="form-group">
                  <label htmlFor="userid">
                    <RiAccountPinBoxFill />
                  </label>
                  <input
                    type="text"
                    name="userid"
                    id="userid"
                    autoComplete="off"
                    value={user.userid}
                    onChange={handleInputs}
                    placeholder="Your userid"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <AiOutlineMail />
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstname">
                    <RiAccountPinBoxFill />
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="off"
                    value={user.firstname}
                    onChange={handleInputs}
                    placeholder="Your Firstname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">
                    <RiAccountPinBoxFill />
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    autoComplete="off"
                    value={user.lastname}
                    onChange={handleInputs}
                    placeholder="Your Lastname"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <RiPhoneLine />
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Your Phone"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">
                    <MdOutlineWork />
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    autoComplete="off"
                    value={user.position}
                    onChange={handleInputs}
                    placeholder="Your Position"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <RiLockPasswordFill />
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <RiLockPasswordFill />
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Your Confirm Password"
                  />
                </div>
                <div className="from-button">
                  <input
                    type="submit"
                    name="register"
                    id="register"
                    className="form-submit"
                    value="Register"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Facultyregistration;
