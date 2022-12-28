import React, { useEffect, useState } from "react";
import "./Qualification.css";
import axios from "axios";

const Qualification = () => {
  const [qetquali, setgetquali] = useState([]);
  const [qualification, setQualification] = useState({
    degree: "",
    university_college: "",
    specialization: "",
    year: "",
  });
  const [updatequalification, setupdateQualification] = useState({
    degree: "",
    university_college: "",
    specialization: "",
    year: "",
  });

  const [isUpdating, setisUpdating] = useState("");

  //Get Qualification to show
  const getQuali = async () => {
    try {
      const res = await fetch("/getuserqualidata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setgetquali(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuali();
  }, []);
  //Add Qualifications
  const inputHandles = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQualification({ ...qualification, [name]: value });
  };

  const addQuali = async (e) => {
    e.preventDefault();
    try {
      const { degree, university_college, specialization, year } =
        qualification;

      //Using Axios

      const res = await axios.post("/qualification", {
        degree,
        university_college,
        specialization,
        year,
      });
      // setgetquali((prev) => [...prev, res.data]);

      if (res.status === 201) {
        window.alert("Qualification Added");
        window.location.reload(); //refress page
        setQualification({
          degree: "",
          university_college: "",
          specialization: "",
          year: "",
        });
      }
    } catch (err) {
      if (err.response.status === 403) {
        window.alert("Please Fill All Details");
      } else {
        console.log(err);
      }
    }
  };

  //Delete Qualification
  const deleteQuali = async (id) => {
    try {
      const res = await axios.delete(`/deletequalification/${id}`);
      const newgetquali = qetquali.filter((item) => item._id !== id);
      setgetquali(newgetquali);

      if (res.status === 201) {
        window.alert("Delted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update Qualification

  const updateinputHandles = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setupdateQualification({ ...updatequalification, [name]: value });
  };

  const renderUpdateForm = () => (
    <form className="update_form">
      <span className="form_group">
        <input
          type="text"
          name="degree"
          id="degree"
          value={updatequalification.degree}
          placeholder="Your Degree"
          onChange={updateinputHandles}
        />
      </span>
      <span className="form_group">
        <input
          type="text"
          name="university_college"
          value={updatequalification.university_college}
          id="university_college"
          placeholder="Your University/college"
          onChange={updateinputHandles}
        />
      </span>
      <span className="form_group">
        <input
          type="text"
          name="specialization"
          value={updatequalification.specialization}
          id="specialization"
          placeholder="Your Specialization"
          onChange={updateinputHandles}
        />
      </span>
      <span className="form_group">
        <input
          type="text"
          name="year"
          value={updatequalification.year}
          id="year"
          placeholder="Your Year"
          onChange={updateinputHandles}
        />
      </span>

      <span className="form_group">
        <div>
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Update"
            className="updateform_quali_btn"
            onClick={updateQualification}
          />
          <input
            type="submit"
            name="cancel"
            id="cancel"
            value="Cancel"
            className="cancelform_quali_btn"
            onClick={cancelUpdateQualification}
          />
        </div>
      </span>
    </form>
  );

  const cancelUpdateQualification = (e) => {
    e.preventDefault();
    setisUpdating("");
  };

  const updateQualification = async (e) => {
    e.preventDefault();
    try {
      const { degree, university_college, specialization, year } =
        updatequalification;
      const res = await axios.put(`/updatequalification/${isUpdating}`, {
        degree,
        university_college,
        specialization,
        year,
      });
      if (res.status === 201) {
        window.alert("Qualification Updated");
        // const upadteQualiIndex = qetquali.findIndex(
        //   (item) => item._id === isUpdating
        // );
        // const updateQuali = (getQauli[upadteQualiIndex].degree = {
        //   degree,
        //   university_college,
        //   specialization,
        //   year,
        // });
        setupdateQualification({
          degree: "",
          university_college: "",
          specialization: "",
          year: "",
        });
        setisUpdating("");
        window.location.reload(); //refress page
        console.log(res.data);
      }
    } catch (err) {
      if (err.response.status === 403) {
        window.alert("Please Fill All Details");
      } else {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="qualification_container">
        <div className="content">
          <div className="heading">
            Qualifications <hr />
          </div>
          <form method="POST" className="add_qualifications_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  value={qualification.degree}
                  placeholder="Your Degree"
                  onChange={inputHandles}
                />
              </div>
              <div className="form_group">
                <label htmlFor="university_college">University/college</label>
                <input
                  type="text"
                  name="university_college"
                  value={qualification.university_college}
                  id="university_college"
                  placeholder="Your University/college"
                  onChange={inputHandles}
                />
              </div>
              <div className="form_group">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={qualification.specialization}
                  id="specialization"
                  placeholder="Your Specialization"
                  onChange={inputHandles}
                />
              </div>
              <div className="form_group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  name="year"
                  value={qualification.year}
                  id="year"
                  placeholder="Your Year"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="addquali"
                id="addquali"
                value="Add Qualification"
                onClick={addQuali}
              />
            </div>
          </form>

          <div className="qualiitem_content">
            <div className="qualiitem_heading">
              <span>Degree</span>
              <span>University/college</span>
              <span>Specialization</span>
              <span>Year</span>
              <span>Delete/Update</span>
            </div>
            <hr />
            {qetquali.map((item, index) => {
              return (
                <>
                  <div className="quali_item" key={index}>
                    {isUpdating === item._id ? (
                      renderUpdateForm()
                    ) : (
                      <>
                        <span> {item.degree}</span>
                        <span> {item.university_college}</span>
                        <span>{item.specialization}</span>
                        <span>{item.year}</span>
                        <span>
                          <div>
                            <button
                              className="delete_quali_btn"
                              onClick={() => {
                                deleteQuali(item._id);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="update_quali_btn"
                              onClick={() => {
                                setisUpdating(item._id);
                              }}
                            >
                              Update
                            </button>
                          </div>
                        </span>
                      </>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Qualification;
