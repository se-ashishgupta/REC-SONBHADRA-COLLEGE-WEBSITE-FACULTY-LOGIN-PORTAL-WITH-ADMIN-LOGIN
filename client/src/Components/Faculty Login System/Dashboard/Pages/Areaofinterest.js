import React, { useState, useEffect } from "react";
import "./Areaofinterest.css";
import axios from "axios";

const Areaofinterest = () => {
  const [getareaofinterest, setgetareaofinterest] = useState([]);
  const [areaofinterest, setareaofinterest] = useState("");
  const [isUpdating, setisUpdating] = useState("");
  const [updateareaofinterest, setupdateareaofinterest] = useState("");
  //Add Area
  const inputHandles = (e) => {
    setareaofinterest(e.target.value);
  };
  const addareaofinterest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/areaofintrests", {
        areaofinterest,
      });
      if (res.status === 201) {
        window.alert("Area of Interest Added");
        window.location.reload(); //refress page
        setareaofinterest("");
      }
    } catch (err) {
      if (err.response.status === 403) {
        window.alert("Please Fill All Details");
      } else {
        console.log(err);
      }
    }
  };

  //Get Area of Interest Data
  const getAreaofInterest = async () => {
    try {
      const res = await axios.get("/getareaofintrests");
      setgetareaofinterest(res.data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAreaofInterest();
  }, []);

  //Delete Area
  const deleteareaofinterest = async (id) => {
    try {
      const res = await axios.delete(`/deleteareaofintrests/${id}`);
      const newgetaoi = getareaofinterest.filter((item) => item._id !== id);
      setgetareaofinterest(newgetaoi);
    } catch (err) {
      console.log(err);
    }
  };
  //Update Area
  const updateinputHandles = (e) => {
    setupdateareaofinterest(e.target.value);
  };

  const renderUpdateForm = () => (
    <form className="update_form_aoi">
      <span className="form_group">
        <input
          type="text"
          name="updateareaofinterest"
          id="updateareaofinterest"
          value={updateareaofinterest}
          placeholder="Your Aarea of Interest"
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
            onClick={updateAareaofinterest}
          />
          <input
            type="submit"
            name="cancel"
            id="cancel"
            value="Cancel"
            className="cancelform_quali_btn"
            onClick={cancelAareaofinterest}
          />
        </div>
      </span>
    </form>
  );

  const cancelAareaofinterest = (e) => {
    e.preventDefault();
    setisUpdating("");
    setupdateareaofinterest("");
  };

  const updateAareaofinterest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/updateareaofinterests/${isUpdating}`, {
        areaofinterest: updateareaofinterest,
      });
      if (res.status === 201) {
        window.alert("Area Of Interest Updated");
        setupdateareaofinterest("");
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
      <div className="areaofinterest_container">
        <div className="content">
          <div className="heading">
            Area of Interest <hr />
          </div>
          <form method="POST" className="add_areaofinterest_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="areaofinterest">Degree</label>
                <input
                  type="text"
                  name="areaofinterest"
                  id="areaofinterest"
                  value={areaofinterest}
                  placeholder="Your Area of Interest"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="addareaofinterest"
                id="addareaofinterest"
                value="Add Area of Interest"
                onClick={addareaofinterest}
              />
            </div>
          </form>

          <div className="areaofinterest_content">
            <div className="areaofinterest_heading">
              <span>Area of Interest</span>
            </div>
            <hr />
            {getareaofinterest.map((item, index) => {
              return (
                <>
                  <div className="areaofinterest_item" key={index}>
                    {isUpdating === item._id ? (
                      renderUpdateForm()
                    ) : (
                      <>
                        <span> {item.areaofinterest}</span>
                        <span>
                          <div>
                            <button
                              className="delete_areaofinterest_btn"
                              onClick={() => {
                                deleteareaofinterest(item._id);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="update_areaofinterest_btn"
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

export default Areaofinterest;
