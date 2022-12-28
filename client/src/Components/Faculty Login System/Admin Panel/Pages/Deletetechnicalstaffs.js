import React, { useState } from "react";
import axios from "axios";
import "./Deletetechnicalstaffs.css";

const Deletetechnicalstaffs = () => {
  //Get ID
  const [userid, setuserid] = useState("");
  //Delete Account

  const deleteAccount = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/deletetechnicalstaff/${userid}`);
      if (res.status === 201) {
        window.alert("Account Deleted Successfully");
        setuserid("");
      }
    } catch (err) {
      if (err.response.status === 401) {
        window.alert("Account Not Found");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="deletetaffs">
        <div className="content">
          <div className="heading">Delete Technical Staff</div>
          <form method="POST" className="deletetaffs_from">
            <div className="input_section">
              <div className="form-group">
                <label htmlFor="userid">UserID/Email*</label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  autoComplete="off"
                  value={userid}
                  placeholder="Your UserID/Email"
                  onChange={(e) => {
                    setuserid(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="register"
                id="register"
                className="form_delete"
                value="Delete"
                onClick={deleteAccount}
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

export default Deletetechnicalstaffs;
