import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Departmentlayout.css";

const Departmentlayout = (props) => {
  return (
    <>
      <div className="department_container">
        <aside className="department_sidebar">
          <div className="nav_item">
            <NavLink to={props.to} className="link">
              WELCOME
            </NavLink>
            <NavLink to="about" className="link">
              About
            </NavLink>
            <NavLink to="faculty" className="link">
              Faculty
            </NavLink>
            <NavLink to="achivements" className="link">
              Achivements
            </NavLink>
            <NavLink to="activities" className="link">
              Activities
            </NavLink>
          </div>
        </aside>
        <div className="department_menu_content">
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Departmentlayout;
