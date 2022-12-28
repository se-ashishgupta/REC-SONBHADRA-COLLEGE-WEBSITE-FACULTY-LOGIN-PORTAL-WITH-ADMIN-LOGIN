import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Faculty Login System/Dashboard/Layouts/Sidebar";

const Dashboardlayout = () => {
  const navigate = useNavigate();
  const callDashboardPage = async () => {
    try {
      const res = await fetch("/dashboard", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/facultylogin");
    }
  };

  useEffect(() => {
    callDashboardPage();
  }, []);
  return (
    <>
      <Sidebar />
    </>
  );
};

export default Dashboardlayout;
