import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [menuStage, setMenuStage] = useState(0);
  const [isLoginOrRegister, setIsLoginOrRegister] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleScroll = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOnlineBankingClick = () => {
    setMenuStage(1);
  };

  const handleUserClick = () => {
    // Directly navigate to user login page
    navigate("/login");
  };

  const handleAdminClick = () => {
    // Directly navigate to admin login page
    navigate("/adminLogin");
  };

  const handleLoginOrRegister = () => {
    setIsLoginOrRegister(true);
  };

  const handleMenuClick = (section) => {
    if (location.pathname === "/") {
      handleScroll(section);
    } else {
      window.location.href = "/#" + section;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/src/assets/Bank.png" alt="SmartBank Logo" className="logo" />
        <ul>
          <li
            style={{ color: "white" }}
            onClick={() => handleMenuClick("products")}
          >
            Products
          </li>
          <li
            style={{ color: "white" }}
            onClick={() => handleMenuClick("news")}
          >
            News
          </li>
          <li
            style={{ color: "white" }}
            onClick={() => handleMenuClick("guide")}
          >
            Guide
          </li>
          <li
            style={{ color: "white" }}
            onClick={() => handleMenuClick("about-us")}
          >
            About Us
          </li>
        </ul>
      </div>
      {!isLoginOrRegister && (
        <div className="navbar-right">
          {menuStage === 0 && (
            <>
            
              <button onClick={handleOnlineBankingClick}>Online Banking</button>
            </>
          )}
        </div>
      )}
      {menuStage === 1 && !isLoginOrRegister && (
        <div className="banking-options">
          <button onClick={handleUserClick}>User</button>
          <button onClick={handleAdminClick}>Admin</button>
        </div>
      )}
      {menuStage === 2 && !isLoginOrRegister && (
        <div className="user-options">
          <button onClick={handleUserClick}>Login as User</button>
        </div>
      )}
      {menuStage === 3 && !isLoginOrRegister && (
        <div className="user-options">
          <button onClick={handleAdminClick}>Login as Admin</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
