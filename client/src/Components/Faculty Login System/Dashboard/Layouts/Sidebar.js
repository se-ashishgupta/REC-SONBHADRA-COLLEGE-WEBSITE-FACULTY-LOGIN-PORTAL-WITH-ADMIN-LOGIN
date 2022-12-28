import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaBook } from "react-icons/fa";
import {
  MdOutlineLibraryBooks,
  MdImage,
  MdUploadFile,
  MdWifiProtectedSetup,
  MdOutlineSettings,
  MdOutlineImportContacts,
  MdOutlineLogout,
  MdMenu,
} from "react-icons/md";

import logolink from "../../../Images/Logo/College_logo1.png";
import "./Sidebar.css";

const Dashboardlayout = () => {
  const [show, setshow] = useState(false);
  const toggle = () => {
    setshow(!show);
  };
  const navitem = [
    {
      to: "/dashboard",
      name: "Dashboard",
      icon: <FaUser />,
    },

    {
      to: "account",
      name: "Account",
      icon: <MdOutlineSettings />,
    },
    {
      to: "qualification",
      name: "Qualification",
      icon: <MdOutlineLibraryBooks />,
    },
    {
      to: "areaofinterest",
      name: "Area of Interest",
      icon: <MdOutlineImportContacts />,
    },
    {
      to: "achivements",
      name: "Achivements",
      icon: <FaBook />,
    },
    {
      to: "profileimg",
      name: "Upload Profile",
      icon: <MdImage />,
    },
    {
      to: "resume",
      name: "Upload Resume",
      icon: <MdUploadFile />,
    },
    {
      to: "changepassword",
      name: "Change Password",
      icon: <MdWifiProtectedSetup />,
    },
  ];

  return (
    <>
      <div className="userpanel_container">
        <div
          className={`userpanel_content ${show ? "navbar_space_toggle" : null}`}
        >
          <div
            className={`topbar_header ${show ? "navbar_space_toggle" : null}`}
          >
            <div className="header_toggle" onClick={toggle}>
              <MdMenu />
            </div>
            <marquee behavior="alternate" className="header_text">
              ...*...Welcome...*...
            </marquee>
          </div>

          <div className={`sidebar ${show ? "slider" : null}`}>
            <div className="navbar_content">
              <div>
                <div className="sidebar_header">
                  <img src={logolink} alt="" className="logo_img" />
                </div>

                <div className="nav_list">
                  {navitem.map((item, index) => {
                    return (
                      <>
                        <NavLink key={index} to={item.to} className="link">
                          <div className="link_icon">{item.icon}</div>
                          <div className="link_name">{item.name}</div>
                        </NavLink>
                      </>
                    );
                  })}
                </div>
              </div>

              <NavLink to="logout" className="logoutlink">
                <div className="logo_icon">
                  <MdOutlineLogout />
                </div>
                <div className="logo_name">Logout</div>
              </NavLink>
            </div>
          </div>
          <div className="item_content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardlayout;
