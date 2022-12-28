import React, { useState } from "react";
import "./Uploadprofile.css";
import axios from "axios";

const Uploadprofile = () => {
  const [profileimg, setprofileimg] = useState("");
  const inputHandles = (e) => {
    setprofileimg(e.target.files[0]);
  };
  const addProfile = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("profileimg", profileimg);
      console.log(formData);
      const res = await axios.put("/updateprofileimg", formData);
      if (res.status === 201) {
        window.alert("Uploaded");
        //  window.location.reload(); //refress page
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="uploadprofile_container">
        <div className="content">
          <div className="heading">
            Upload Profile <hr />
          </div>
          <form className="uploadprofile_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="profileimg">Profile</label>
                <input
                  type="file"
                  name="profileimg"
                  id="profileimg"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="addprofile"
                id="addprofile"
                value="Upload Profile"
                onClick={addProfile}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploadprofile;
