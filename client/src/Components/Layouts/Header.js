import React from "react";
import "./Header.css";
import logo from "../Images/Logo/College_logo1.png";
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
const Header = () => {
  return (
    <>
      <div className="header_container">
        <div className="content">
          <div className="header1"></div>
          <div className="header2">
            <div className="header_logo">
              <div className="logo">
                <img src={logo} alt="website_logo" />
              </div>
              <div className="logo_text">
                <span className="text1">राजकीय इंजीनियरिंग कॉलेज सोनभद्र</span>
                <span className="text2">
                  Rajkiya Engineering College Sonbhadra
                </span>
                <span className="text3">
                  An AICTE approved Government Engineering College affiliated to
                  AKTU Lucknow (College Code 841)
                </span>
              </div>
            </div>
            <div className="header_contact">
              <a href="/" target="_blank">
                <FaFacebookSquare />
              </a>
              <a href="/" target="_blank">
                <FaTwitterSquare />
              </a>
              <a href="/" target="_blank">
                <FaLinkedin />
              </a>
              <a href="/" target="_blank">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
