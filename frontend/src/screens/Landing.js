import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import mainMenu from "./mainMenu";
import "./Landing.css";
import Login from "./Login";
import { useHistory } from "react-router-dom";
const Landing = () => {
  let history = useHistory();
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userCred } = userLogin;
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  return (
    <div className="containers">
      {userCred ? <Sidebar openSidebar /> : history.push("/login")}
    </div>
  );
};

export default Landing;
