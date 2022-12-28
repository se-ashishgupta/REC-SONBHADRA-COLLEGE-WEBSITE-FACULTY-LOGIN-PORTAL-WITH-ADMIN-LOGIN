import React, { useState } from "react";
import "./Uploadprofile.css";
import axios from "axios";

const Uploadresume = () => {
  const [resume, setresume] = useState("");
  const inputHandles = (e) => {
    setresume(e.target.files[0]);
  };
  const addResume = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("resume", resume);
      console.log(formData);
      const res = await axios.put("/updateresume", formData);
      if (res.status === 201) {
        window.alert("Uploaded Successfully");
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
            Upload Resume <hr />
          </div>
          <form className="uploadprofile_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="resume">Resume</label>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="addresume"
                id="addresume"
                value="Upload Resume"
                onClick={addResume}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Uploadresume;
