import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Departments.css";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const Departments = () => {
  const departments = [
    {
      to: "ash",
      title: "Applied Science and Humanities ",
      email: "hodcse@recs.ac.in",
      hod: "Dr. Amod Kumar Tiwari",
    },
    {
      to: "cse",
      title: "Computer Science and Engineering",
      email: "hodcse@recs.ac.in",
      hod: "Dr. Amod Kumar Tiwari",
    },
    {
      to: "ece",
      title: "Electronics Engineering",
      email: "hodece@recs.ac.in",
      hod: "Dr. Dharmendra Dixit",
    },
    {
      to: "ee",
      title: "Electrical Department",
      email: "hodee@recs.ac.in",
      hod: "Dr. Raj Kumar Patel",
    },
  ];
  return (
    <>
      <div className="departmenthome">
        {departments.map((item, index) => {
          return (
            <>
              <NavLink to={item.to} index={index} className="link">
                <div className="card">
                  <img
                    src="https://nitsri.ac.in/upload/department/mech.jpg"
                    className="card_img"
                    alt="departmentimg"
                  />
                  <div className="card_body">
                    <h5 className="card_title">{item.title}</h5>
                    <p className="card_email">
                      <AiOutlineMail />
                      <span>{item.email}</span>
                    </p>
                    <p className="card_email">
                      <AiOutlineUser />
                      <span>Hod:{item.hod}</span>
                    </p>
                  </div>
                </div>
              </NavLink>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Departments;
