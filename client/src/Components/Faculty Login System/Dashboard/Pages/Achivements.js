import React, { useState, useEffect } from "react";
import "./Achivements.css";
import axios from "axios";

const Achivements = () => {
  const [getachivement, setgetachivement] = useState([]);
  const [achivement, setachivement] = useState("");
  const [isUpdating, setisUpdating] = useState("");
  const [updateachivement, setupdateachivement] = useState("");
  //Add Area
  const inputHandles = (e) => {
    setachivement(e.target.value);
  };
  const addachivement = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/achivements", {
        achivement,
      });
      if (res.status === 201) {
        window.alert("Area of Interest Added");
        window.location.reload(); //refress page
        setachivement("");
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
  const getAchivement = async () => {
    try {
      const res = await axios.get("/getachivements");
      setgetachivement(res.data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAchivement();
  }, []);

  //Delete Area
  const deleteAchivement = async (id) => {
    try {
      const res = await axios.delete(`/deleteachivements/${id}`);
      const newgetaoi = getachivement.filter((item) => item._id !== id);
      setgetachivement(newgetaoi);

      if (res.status === 201) {
        window.alert("Deleted Suceesfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Update Area
  const updateinputHandles = (e) => {
    setupdateachivement(e.target.value);
  };

  const renderUpdateForm = () => (
    <form className="update_form_aoi">
      <span className="form_group">
        <input
          type="text"
          name="updateareaofinterest"
          id="updateareaofinterest"
          value={updateachivement}
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
            onClick={updateAchivement}
          />
          <input
            type="submit"
            name="cancel"
            id="cancel"
            value="Cancel"
            className="cancelform_quali_btn"
            onClick={cancelAchivement}
          />
        </div>
      </span>
    </form>
  );

  const cancelAchivement = (e) => {
    e.preventDefault();
    setisUpdating("");
    setupdateachivement("");
  };

  const updateAchivement = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/updateachivements/${isUpdating}`, {
        achivement: updateachivement,
      });

      if (res.status === 201) {
        window.alert("Area Of Interest Updated");
        setupdateachivement("");
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
            Achivements <hr />
          </div>
          <form method="POST" className="add_areaofinterest_form">
            <div className="input_section">
              <div className="form_group">
                <label htmlFor="areaofinterest">Degree</label>
                <input
                  type="text"
                  name="areaofinterest"
                  id="areaofinterest"
                  value={achivement}
                  placeholder="Your Achivement"
                  onChange={inputHandles}
                />
              </div>
            </div>
            <div className="button_section">
              <input
                type="submit"
                name="addareaofinterest"
                id="addareaofinterest"
                value="Add Achivement"
                onClick={addachivement}
              />
            </div>
          </form>

          <div className="areaofinterest_content">
            <div className="areaofinterest_heading">
              <span>Achivement</span>
            </div>
            <hr />
            {getachivement.map((item, index) => {
              return (
                <>
                  <div className="areaofinterest_item" key={index}>
                    {isUpdating === item._id ? (
                      renderUpdateForm()
                    ) : (
                      <>
                        <span> {item.achivement}</span>
                        <span>
                          <div>
                            <button
                              className="delete_areaofinterest_btn"
                              onClick={() => {
                                deleteAchivement(item._id);
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

export default Achivements;
