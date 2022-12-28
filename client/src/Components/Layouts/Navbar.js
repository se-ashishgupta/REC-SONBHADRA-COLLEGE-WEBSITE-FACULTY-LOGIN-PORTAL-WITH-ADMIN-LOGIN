import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const navitem = [
    {
      to: "/home",
      name: "Home",
    },
    {
      to: "/placementcell",
      name: "Placement Cell",
    },
    {
      to: "/aboutcollege",
      name: "About College",
    },
    {
      to: "/facultylogin",
      name: "Faculty Login",
    },
  ];
  return (
    <>
      <div className="webiste_nav">
        <div className="nav_logo">
          <h2>REC SONBHADRA</h2>
        </div>
        <div className="nav_list">
          {navitem.map((item, index) => {
            return (
              <NavLink to={item.to} key={index} className="nav_link">
                {item.name}
              </NavLink>
            );
          })}

          <div class="dropdown">
            <NavLink to="department" className="nav_link department">
              Departments
            </NavLink>
            <div class="dropdown-content">
              <Link className="nav_link" to="/department/ash">
                ASH
              </Link>
              <Link className="nav_link" to="/department/cse">
                CSE
              </Link>
              <Link className="nav_link" to="/department/ece">
                ECE
              </Link>
              <Link className="nav_link" to="/department/ee">
                EE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
