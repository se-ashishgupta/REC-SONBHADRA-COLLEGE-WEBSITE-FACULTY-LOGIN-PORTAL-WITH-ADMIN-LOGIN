import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  MdDelete,
  MdWifiProtectedSetup,
  MdPersonAddAlt1,
  MdAccountBox,
  MdMenu,
  MdOutlineLogout,
} from "react-icons/md";
import "./Adminpanel.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../../Images/Logo/College_logo1.png";

const AdminPanel = () => {
  const navigate = useNavigate();
  const callDashboardPage = async () => {
    try {
      const res = await fetch("/adminpanel", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/facultylogin");
    }
  };

  useEffect(() => {
    callDashboardPage();
  }, []);

  const [show, setshow] = useState(false);
  const toggle = () => {
    setshow(!show);
  };
  const navitem = [
    {
      to: "/adminpanel",
      name: "Dashboard",
      icon: <MdAccountBox />,
    },
    {
      to: "addfaculty",
      name: "Add Faculty",
      icon: <MdPersonAddAlt1 />,
    },
    {
      to: "deletefaculty",
      name: "Delete Faculty",
      icon: <MdDelete />,
    },
    {
      to: "addtechnicalstaffs",
      name: "Add Technical Staff",
      icon: <MdPersonAddAlt1 />,
    },
    {
      to: "deletetechnicalstaffs",
      name: "Delete Technical Staff",
      icon: <MdDelete />,
    },
    {
      to: "changepassword",
      name: "Change Password",
      icon: <MdWifiProtectedSetup />,
    },
  ];
  return (
    <>
      <div className="adminpanel_container">
        <div
          className={`adminpanel_content ${
            show ? "navbar_space_toggle" : null
          }`}
        >
          <div
            className={`topbar_header ${show ? "navbar_space_toggle" : null}`}
          >
            <div className="header_toggle" onClick={toggle}>
              <MdMenu />
            </div>
            <marquee behavior="alternate" className="header_text">
              ...*...Welcome To Admin Panel...*...
            </marquee>
          </div>
          <div className={`sidebar ${show ? "slider" : null}`}>
            <div className="navbar_content">
              <div>
                <div className="sidebar_header">
                  <img src={logo} alt="logo" className="logo_img" />
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

              <NavLink to="logoutadmin" className="logoutlink">
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

export default AdminPanel;
