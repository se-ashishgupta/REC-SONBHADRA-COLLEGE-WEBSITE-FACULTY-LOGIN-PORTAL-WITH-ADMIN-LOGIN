import React, { useEffect, useState } from "react";
import "../CSE/Csefaculty.css";
import { AiOutlineTeam } from "react-icons/ai";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiFillBook,
  AiOutlinePhone,
} from "react-icons/ai";
import { SiMinds } from "react-icons/si";
import axios from "axios";

const Csefaculty = () => {
  const [userData, setuserData] = useState([]);

  const getuserdatatowebsite = async () => {
    try {
      const resp = await axios.get("/getecedatatowebsite");
      setuserData(resp.data);

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getuserdatatowebsite();
  }, []);

  // View More Details Functionallity
  const [isUpdating, setisUpdating] = useState("");
  const cancelViewMore = (e) => {
    e.preventDefault();
    setisUpdating("");
  };
  const renderUpdateForm = (item) => (
    <>
      <div className="detail_card">
        <div className="col_1">
          <img src={"http://localhost:8000/" + item.profileimg} alt="" />
          <button onClick={cancelViewMore}>View Less</button>
        </div>
        <div className="col_2">
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">Name:</div>
            </div>
            <div className="info_text">{`${item.firstname} ${item.lastname}`}</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiFillBook />
              </div>
              <div className="logo_text">Position:</div>
            </div>
            <div className="info_text">{item.position}</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineMail />
              </div>
              <div className="logo_text">Email:</div>
            </div>
            <div className="info_text">{item.email}</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlinePhone />
              </div>
              <div className="logo_text">Phone:</div>
            </div>
            <div className="info_text">8114110590</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <SiMinds />
              </div>
              <div className="logo_text">Area Of Interest:</div>
            </div>
            <div className="info_text">
              {item.areaofinterests &&
                item.areaofinterests.map((item, index) => {
                  return (
                    <>
                      <div className="qualification_item" key={index}>
                        <>
                          <span> {item.areaofinterest}</span>
                        </>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="more_detail_card">
        <div className="col_1">
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">About:</div>
            </div>
            <div className="info_text">{item.about}</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">Qualifications:</div>
            </div>
            <div className="info_text">
              {item.qualifications &&
                item.qualifications.map((item, index) => {
                  return (
                    <>
                      <div className="qualification_item" key={index}>
                        <>
                          <span> {item.degree}</span>
                          <span> {item.university_college}</span>
                          <span>{item.specialization}</span>
                          <span>{item.year}</span>
                        </>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">Teaching Experiance:</div>
            </div>
            <div className="info_text">{item.teachingexperiance}</div>
          </div>
          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">Achivements:</div>
            </div>
            <div className="info_text">
              {item.achivements &&
                item.achivements.map((item, index) => {
                  return (
                    <>
                      <div className="qualification_item" key={index}>
                        <>
                          <span> {item.degree}</span>
                          <span> {item.university_college}</span>
                          <span>{item.specialization}</span>
                          <span>{item.year}</span>
                        </>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>

          <div className="info">
            <div className="info_logo">
              <div className="logo">
                <AiOutlineUser />
              </div>
              <div className="logo_text">CV Download:</div>
            </div>
            <div className="info_text">
              <button>Click Here to Download CV</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="csefaculty">
        <div className="header">
          <span>
            <AiOutlineTeam />
          </span>
          FACULTY LIST...
        </div>
        {userData.map((item, index) => {
          return (
            <>
              <div className="faculty_detail_card" key={index}>
                {isUpdating === item._id ? (
                  renderUpdateForm(item)
                ) : (
                  <div className="detail_card">
                    <div className="col_1">
                      <img
                        src={"http://localhost:8000/" + item.profileimg}
                        alt=""
                      />
                      <button onClick={() => setisUpdating(item._id)}>
                        View More
                      </button>
                    </div>
                    <div className="col_2">
                      <div className="info">
                        <div className="info_logo">
                          <div className="logo">
                            <AiOutlineUser />
                          </div>
                          <div className="logo_text">Name:</div>
                        </div>
                        <div className="info_text">{`${item.firstname} ${item.lastname}`}</div>
                      </div>
                      <div className="info">
                        <div className="info_logo">
                          <div className="logo">
                            <AiFillBook />
                          </div>
                          <div className="logo_text">Position:</div>
                        </div>
                        <div className="info_text">{item.position}</div>
                      </div>
                      <div className="info">
                        <div className="info_logo">
                          <div className="logo">
                            <AiOutlineMail />
                          </div>
                          <div className="logo_text">Email:</div>
                        </div>
                        <div className="info_text">{item.email}</div>
                      </div>
                      <div className="info">
                        <div className="info_logo">
                          <div className="logo">
                            <AiOutlinePhone />
                          </div>
                          <div className="logo_text">Phone:</div>
                        </div>
                        <div className="info_text">8114110590</div>
                      </div>
                      <div className="info">
                        <div className="info_logo">
                          <div className="logo">
                            <SiMinds />
                          </div>
                          <div className="logo_text">Area Of Interest:</div>
                        </div>
                        <div className="info_text">
                          {item.areaofinterests &&
                            item.areaofinterests.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="qualification_item"
                                    key={index}
                                  >
                                    <>
                                      <span> {item.areaofinterest}</span>
                                    </>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Csefaculty;
