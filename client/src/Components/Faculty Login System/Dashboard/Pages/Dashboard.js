import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
const Dashboard = () => {
  const [userData, setuserData] = useState({});

  const getUserData = async () => {
    try {
      const res = await fetch("/getuserdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setuserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="user_profile">
        <div className="heading">
          Profile
          <hr />
        </div>
        <form method="GET">
          <div className="row1 ">
            <div className="column profile_img">
              <div>
                <img src={userData.profileimg} alt="profileimg" />
              </div>
            </div>
            <div className="column profile_head ">
              <h4>Welcome</h4>
              <h5>
                {`${userData.firstname}
                  ${userData.lastname}`}
              </h5>
              <h6>{userData.position}</h6>
            </div>
            <div className="column profile_bio">
              <h4>About:</h4>
              <div>{userData.about}</div>
            </div>
          </div>

          <div className="row2">
            <Tabs
              defaultActiveKey="basicinfo"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="basicinfo" title="Basic Info">
                <div className="infobox">
                  <div className="info">
                    <div className="info_title">UserID:</div>
                    <div className="info_value">{userData.userid}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">First Name:</div>
                    <div className="info_value">{userData.firstname}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Last Name:</div>
                    <div className="info_value">{userData.lastname}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Father Name:</div>
                    <div className="info_value"> {userData.fathername}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Mother Name:</div>
                    <div className="info_value"> {userData.mothername}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Gender:</div>
                    <div className="info_value"> {userData.gender}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Date of Birth:</div>
                    <div className="info_value">Ashish Gupta</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Religion:</div>
                    <div className="info_value"> {userData.religion}</div>
                  </div>

                  <div className="info">
                    <div className="info_title">Email:</div>
                    <div className="info_value"> {userData?.email}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Phone:</div>
                    <div className="info_value"> {userData?.phone}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Position:</div>
                    <div className="info_value"> {userData.position}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Department:</div>
                    <div className="info_value"> {userData.department}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Teaching Experiance:</div>
                    <div className="info_value">
                      {userData.teachingexperiance}
                    </div>
                  </div>
                  <div className="info">
                    <div className="info_title">Date of Birth:</div>
                    <div className="info_value"> {userData.dob}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Joining Date:</div>
                    <div className="info_value"> {userData.joiningdate}</div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="contactinfo" title="Contact Info">
                <div className="infobox">
                  <div className="info">
                    <div className="info_title">Address 1:</div>
                    <div className="info_value">{userData.address1}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Address 2:</div>
                    <div className="info_value">{userData.address2}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">City:</div>
                    <div className="info_value">{userData.city}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Zip Code:</div>
                    <div className="info_value">{userData.zipcode}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">State:</div>
                    <div className="info_value">{userData.state}</div>
                  </div>
                  <div className="info">
                    <div className="info_title">Country:</div>
                    <div className="info_value">{userData.country}</div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="qualification" title="Qualifications">
                <div className="qualifications">
                  <div className="qualifications_heading">
                    <span>Degree</span>
                    <span>University/college</span>
                    <span>Specialization</span>
                    <span>Year</span>
                  </div>
                  <hr />
                  {userData.qualifications &&
                    userData.qualifications.map((item, index) => {
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
              </Tab>
              <Tab eventKey="intrest" title="Area of Intrest">
                <div className="areaofinterests">
                  {userData.areaofinterests &&
                    userData.areaofinterests.map((item, index) => {
                      return (
                        <>
                          <div className="areaofinterest_item" key={index}>
                            <>
                              <span> {item.areaofinterest}</span>
                            </>
                          </div>
                        </>
                      );
                    })}
                </div>
              </Tab>
              <Tab eventKey="achivement" title="Achivements">
                <div className="achivements">
                  {userData.achivements &&
                    userData.achivements.map((item, index) => {
                      return (
                        <>
                          <div className="achivement_item" key={index}>
                            <>
                              <span> {item.achivement}</span>
                            </>
                          </div>
                        </>
                      );
                    })}
                </div>
              </Tab>
            </Tabs>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
