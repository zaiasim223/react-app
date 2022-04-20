import React from "react";
import logo from "@/assets/images/logo.png";
import "./index.less";
const Logo = () => {
  return (
    <div className="sidebar-logo-container">
      <img src={logo} className="sidebar-logo" alt="logo" />
      {/* <h1 className="sidebar-title">InnerCity</h1> */}
    </div>
  );
};

export default Logo;
