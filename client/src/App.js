import React from "react";
import "./App.css";
import Home from "./Components/Layouts/Home";
import { Route, Routes } from "react-router-dom";
import Placementcell from "./Components/Placementcell/Placementcell";
import About from "./Components/The College/About";
import Facultylogin from "./Components/Faculty Login System/Facultylogin";
import "bootstrap/dist/css/bootstrap.min.css";
import Departments from "./Components/Departments/Departments";
import Layout from "./Components/Layouts/Layout";
//User Dashborad
import Dashboardlayout from "./Components/Faculty Login System/Dashboardlayout";
import Dashboard from "./Components/Faculty Login System/Dashboard/Pages/Dashboard";
import Account from "./Components/Faculty Login System/Dashboard/Pages/Account";
import Qualification from "./Components/Faculty Login System/Dashboard/Pages/Qualification";
import Areaofinterest from "./Components/Faculty Login System/Dashboard/Pages/Areaofinterest";
import Achivements from "./Components/Faculty Login System/Dashboard/Pages/Achivements";
import Changepassword from "./Components/Faculty Login System/Dashboard/Pages/Changepassword";
import Uploadprofile from "./Components/Faculty Login System/Dashboard/Pages/Uploadprofile";
import Uploadresume from "./Components/Faculty Login System/Dashboard/Pages/Uploadresume";
import Logout from "./Components/Faculty Login System/Dashboard/Pages/Logout";
//Ash
import Ash from "./Components/Departments/ASH/Ash";
import Ashhome from "./Components/Departments/ASH/Ashhome";
import Ashfaculty from "./Components/Departments/ASH/Ashfaculty";
import Ashabout from "./Components/Departments/ASH/Ashabout";
import Ashachivements from "./Components/Departments/ASH/Ashachivements";
import Ashactivities from "./Components/Departments/ASH/Ashactivities";
//Cse
import Cse from "./Components/Departments/CSE/Cse";
import Csehome from "./Components/Departments/CSE/Csehome";
import Csefaculty from "./Components/Departments/CSE/Csefaculty";
import Cseabout from "./Components/Departments/CSE/Cseabout";
import Cseachivements from "./Components/Departments/CSE/Cseachivements";
import Cseactivities from "./Components/Departments/CSE/Cseactivities";
//Ece
import Ece from "./Components/Departments/ECE/Ece";
import Ecehome from "./Components/Departments/ECE/Ecehome";
import Eceabout from "./Components/Departments/ECE/Eceabout";
import Eceachivements from "./Components/Departments/ECE/Eceachivements";
import Ecefaculty from "./Components/Departments/ECE/Ecefaculty";
import Eceactivities from "./Components/Departments/ECE/Eceactivities";
//Ee
import Ee from "./Components/Departments/EE/Ee";
import Eehome from "./Components/Departments/EE/Eehome";
import Eeabout from "./Components/Departments/EE/Eeabout";
import Eefaculty from "./Components/Departments/EE/Eefaculty";
import Eeachivements from "./Components/Departments/EE/Eeachivements";
import Eeactivities from "./Components/Departments/EE/Eeactivities";
//Admin Panel
import Adminpanel from "./Components/Faculty Login System/Admin Panel/Layout/Adminpanel";
import Admindashboard from "./Components/Faculty Login System/Admin Panel/Pages/Admindashboard";
import Addfaculty from "./Components/Faculty Login System/Admin Panel/Pages/Addfaculty";
import Deletefaculty from "./Components/Faculty Login System/Admin Panel/Pages/Deletefaculty";
import Addtechnicalstaffs from "./Components/Faculty Login System/Admin Panel/Pages/Addtechnicalstaffs";
import Deletetechnicalstaffs from "./Components/Faculty Login System/Admin Panel/Pages/Deletetechnicalstaffs";
import Logoutadmin from "./Components/Faculty Login System/Admin Panel/Pages/Logoutadmin";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Facultylogin />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="placementcell" element={<Placementcell />}></Route>
          <Route path="aboutcollege" element={<About />}></Route>
          <Route path="department" element={<Departments />}></Route>
          {/* //Login */}
          <Route path="facultylogin" element={<Facultylogin />}></Route>

          {/* Departments Routes */}
          {/* ASH DEPARTMENT */}
          <Route path="department/ash/" element={<Ash />}>
            <Route index element={<Ashhome />}></Route>
            <Route path="about" element={<Ashabout />}></Route>
            <Route path="faculty" element={<Ashfaculty />}></Route>
            <Route path="achivements" element={<Ashachivements />}></Route>
            <Route path="activities" element={<Ashactivities />}></Route>
          </Route>
          {/* CSE DEPARTMENT */}
          <Route path="department/cse/" element={<Cse />}>
            <Route index element={<Csehome />}></Route>
            <Route path="about" element={<Cseabout />}></Route>
            <Route path="faculty" element={<Csefaculty />}></Route>
            <Route path="achivements" element={<Cseachivements />}></Route>
            <Route path="activities" element={<Cseactivities />}></Route>
          </Route>
          {/* ECE DEPARTMENT */}
          <Route path="department/ece/" element={<Ece />}>
            <Route index element={<Ecehome />}></Route>
            <Route path="about" element={<Eceabout />}></Route>
            <Route path="faculty" element={<Ecefaculty />}></Route>
            <Route path="achivements" element={<Eceachivements />}></Route>
            <Route path="activities" element={<Eceactivities />}></Route>
          </Route>
          {/* EE DEPARTMENT */}
          <Route path="department/ee/" element={<Ee />}>
            <Route index element={<Eehome />}></Route>
            <Route path="about" element={<Eeabout />}></Route>
            <Route path="faculty" element={<Eefaculty />}></Route>
            <Route path="achivements" element={<Eeachivements />}></Route>
            <Route path="activities" element={<Eeactivities />}></Route>
          </Route>
        </Route>
        {/* Admin Panel */}
        <Route path="/adminpanel/" element={<Adminpanel />}>
          <Route index element={<Admindashboard />}></Route>
          <Route path="addfaculty" element={<Addfaculty />}></Route>
          <Route path="deletefaculty" element={<Deletefaculty />}></Route>
          <Route
            path="addtechnicalstaffs"
            element={<Addtechnicalstaffs />}
          ></Route>
          <Route
            path="deletetechnicalstaffs"
            element={<Deletetechnicalstaffs />}
          ></Route>
          <Route path="changepassword" element={<Changepassword />}></Route>
          <Route path="logoutadmin" element={<Logoutadmin />}></Route>
        </Route>
        {/* Dashboard */}
        <Route path="/dashboard/" element={<Dashboardlayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="areaofinterest" element={<Areaofinterest />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="qualification" element={<Qualification />}></Route>
          <Route path="achivements" element={<Achivements />}></Route>
          <Route path="profileimg" element={<Uploadprofile />}></Route>
          <Route path="resume" element={<Uploadresume />}></Route>
          <Route path="changepassword" element={<Changepassword />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
