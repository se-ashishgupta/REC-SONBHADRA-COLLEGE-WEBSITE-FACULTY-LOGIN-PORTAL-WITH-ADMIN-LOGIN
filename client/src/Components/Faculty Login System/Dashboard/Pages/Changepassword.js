import axios from "axios";
import React, { useState } from "react";
import "./Changepassword.css";
const Changepassword = () => {
  const [pass, setpass] = useState({
    oldpassword: "",
    newpassword: "",
    cnewpassword: "",
  });
  const inputHandles = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setpass({ ...pass, [name]: value });
  };

  const ChangePassword = async (e) => {
    const { oldpassword, newpassword, cnewpassword } = pass;
    try {
      e.preventDefault();
      const res = await axios.put("/changepassword", {
        oldpassword,
        newpassword,
        cnewpassword,
      });

      if (res.status === 201) {
        window.alert("Chnaged Successfully");
        setpass({
          oldpassword: "",
          newpassword: "",
          cnewpassword: "",
        });
      }
    } catch (err) {
      if (err.response.status === 422) {
        window.alert("Fill all Details");
      } else if (err.response.status === 400) {
        window.alert("Old Password is Wrong");
      } else if (err.response.status === 401) {
        window.alert("New Password and Confirm New Password is not Matched");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="changepassword">
        <div className="content">
          <div className="heading">
            Change Password <hr />
          </div>
          <form method="POST" className="changepassword_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="oldpassword">Old Password</label>
                <input
                  type="password"
                  name="oldpassword"
                  id="oldpassword"
                  value={pass.oldpassword}
                  placeholder="Your Old Password"
                  onChange={inputHandles}
                />
              </div>
              <div className="form_group">
                <label htmlFor="newpassword">New Password</label>
                <input
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={pass.newpassword}
                  placeholder="Your New Password"
                  onChange={inputHandles}
                />
              </div>
              <div className="form_group">
                <label htmlFor="cnewpassword">Confirm New Password</label>
                <input
                  type="password"
                  name="cnewpassword"
                  id="cnewpassword"
                  value={pass.cnewpassword}
                  placeholder="Your Confirm New Password"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="changepassword"
                id="changepassword"
                value="Change Password"
                onClick={ChangePassword}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Changepassword;
