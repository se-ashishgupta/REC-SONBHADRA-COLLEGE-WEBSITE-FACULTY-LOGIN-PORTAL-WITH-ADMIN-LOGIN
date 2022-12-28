import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import loginimage from "../Images/Logo/College_logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Style.css";
import Loader from "../Loader";
const Facultylogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    try {
      setloading(true);
      e.preventDefault();
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.status === 422) {
        setloading(false);
        window.alert("Please Fill All Details");
      } else if (res.status === 400 || !data) {
        setloading(false);
        window.alert("Invalid Credentials");
      } else if (res.status === 350) {
        setloading(false);
        window.alert("Admin Login Successfully");
        navigate("/adminpanel");
      } else {
        setloading(false);
        window.alert("Login Successfully");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login-content">
            <div className="login-image">
              <figure>
                <img src={loginimage} alt="login-img" />
              </figure>
              <h2>Welcome To Rec Sonbhadra</h2>
            </div>

            <div className="login-form">
              <h2 className="form-title">Log-In</h2>
              <form method="POST" className="userlogin-from">
                <div className="form-group">
                  <label htmlFor="email">
                    <AiOutlineMail />
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    placeholder="Your Email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    placeholder="Your Password"
                  />
                </div>
                <NavLink href="/fcultylogin">Forgot Password?</NavLink>
                <div className="from-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    onClick={loginUser}
                    className="form-submit"
                    value="Log In"
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

export default Facultylogin;
