import React, { useState } from "react";
import "./Deletefaculty.css";
import axios from "axios";

const Deletefaculty = () => {
  //Get ID
  const [userid, setuserid] = useState("");
  //Delete Account

  const deleteAccount = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.delete(`/deleteaccount/${userid}`);
      if (res.status === 201) {
        window.alert("Account Deleted");
        setuserid("");
      }
    } catch (err) {
      if (err.response.status === 401) {
        window.alert("Account Not Fount");
        setuserid("");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="deletefaculty">
        <div className="content">
          <div className="heading">Delete Faculty</div>
          <form method="DELETE" className="deletefaculty_from">
            <div className="input_section">
              <div className="form-group">
                <label htmlFor="userid">UserID/Email*</label>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  autoComplete="off"
                  value={userid}
                  onChange={(e) => {
                    setuserid(e.target.value);
                  }}
                  placeholder="Your UserID/Email"
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="delete"
                id="delete"
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

export default Deletefaculty;
