import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import { FaUserAlt } from "react-icons/fa";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import loadgif from "../../../Images/loadingimage.gif";
const Admindashboard = () => {
  //Get Data
  const [ashData, setashData] = useState([]);
  const [cseData, setcseData] = useState([]);
  const [eceData, seteceData] = useState([]);
  const [eeData, seteeData] = useState([]);
  const [rsData, setrsData] = useState([]);
  const [tsData, settsData] = useState([]);

  const [totalashData, settotalashData] = useState([]);
  const [totalcseData, settotalcseData] = useState([]);
  const [totaleceData, settotaleceData] = useState([]);
  const [totaleeData, settotaleeData] = useState([]);
  const [totalrsData, settotalrsData] = useState([]);
  const [totaltsData, settotaltsData] = useState([]);
  const getuserdatatoadminpanel = async () => {
    try {
      //Data List
      const ashlist = await axios.get("/getashdatatowebsite");
      setashData(ashlist.data);
      settotalashData(ashlist.data.length);
      const cselist = await axios.get("/getcsedatatowebsite");
      setcseData(cselist.data);
      settotalcseData(cselist.data.length);
      const ecelist = await axios.get("/getecedatatowebsite");
      seteceData(ecelist.data);
      settotaleceData(ecelist.data.length);
      const eelist = await axios.get("/geteedatatowebsite");
      seteeData(eelist.data);
      settotaleeData(eelist.data.length);
      const rslist = await axios.get("/getrsdatatowebsite");
      setrsData(rslist.data);
      settotalrsData(rslist.data.length);
      const tslist = await axios.get("/gettsdatatowebsite");
      settsData(tslist.data);
      settotaltsData(tslist.data.length);

      if (
        !ashlist.status === 200 ||
        !cselist.status === 200 ||
        !ecelist.status === 200 ||
        !eelist.status === 200 ||
        !rslist.status === 200
      ) {
        const error = new Error(ashlist.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getuserdatatoadminpanel();
  }, []);

  const user = [
    {
      icon: <FaUserAlt />,
      department: "ASH Feculty",
      no: totalashData,
    },
    {
      icon: <FaUserAlt />,
      department: "CSE Feculty",
      no: totalcseData,
    },
    {
      icon: <FaUserAlt />,
      department: "EL Feculty",
      no: totaleceData,
    },
    {
      icon: <FaUserAlt />,
      department: "EE Feculty",
      no: totaleeData,
    },
    {
      icon: <FaUserAlt />,
      department: "Research Scholars",
      no: totalrsData,
    },
    {
      icon: <FaUserAlt />,
      department: "Technical Staffs",
      no: totaltsData,
    },
  ];

  return (
    <>
      <div className="admindashboard">
        <div className="content">
          <div className="heading">
            Admin Panel Dashboard <hr className="line" />
          </div>
          <div className="reports">
            {user.map((item, index) => {
              return (
                <>
                  <div className="repo" key={index}>
                    <div className="icon">
                      <FaUserAlt />
                      <img src={loadgif} alt="Loading img"></img>
                    </div>
                    <div className="repo_text">
                      <span className="department">{item.department}</span>
                      <span className="no">{item.no}</span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="heading">
            Faculty Lists <hr className="line" />
          </div>
          <div className="faculty_list">
            <Tabs
              defaultActiveKey="ashlist"
              id="uncontrolled-tab-example"
              className="mb-3 tabs"
            >
              <Tab eventKey="ashlist" title="Applied Science and Humanities">
                <div className="ash_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    {ashData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
              <Tab eventKey="cselist" title="Computer Science and Engineering">
                <div className="cse_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    {cseData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
              <Tab eventKey="ecelist" title="Electronics Engineering">
                <div className="ece_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    {eceData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
              <Tab eventKey="eelist" title="Electrical Engineering">
                <div className="ee_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    {eeData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
              <Tab eventKey="rslist" title="Research Scholars">
                <div className="rs_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Position</th> */}
                        <th>Department</th>
                      </tr>
                    </thead>
                    {rsData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.department}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
              <Tab eventKey="tslist" title="Technical Staffs">
                <div className="ts_list">
                  <table>
                    <thead>
                      <tr className="list_heading">
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Position</th> */}
                        <th>Position</th>
                      </tr>
                    </thead>
                    {tsData.map((item, index) => {
                      return (
                        <>
                          <tbody key={index}>
                            <tr>
                              <td>{item.userid}</td>
                              <td>{`${item.firstname} ${item.lastname}`}</td>
                              <td>{item.email}</td>
                              <td>{item.position}</td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admindashboard;
