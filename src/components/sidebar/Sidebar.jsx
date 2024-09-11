import React, { useState } from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  return (
    <div className={sidebarClass}>
      <div className="collapsable">
        <button onClick={toggleSidebar} className="sidebar-toggle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-panel-right-open"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m10 15-3-3 3-3" />
          </svg>
        </button>

        <div className="navs">
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksMyLocationPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-map-pin-plus-inside"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <path d="M12 7v6" />
                <path d="M9 10h6" />
              </svg>
            </NavLink>

            {/* <Button className="icon" startIcon={<AddLocationIcon />} /> */}
            {isOpen && (
              <NavLink exact="true" to="/MaptalksMyLocationPage">
                <Button size="large">
                  <span className="yellowcolor">My Location</span>
                </Button>
              </NavLink>
            )}
          </div>
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksPinPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pin"
              >
                <path d="M12 17v5" />
                <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
              </svg>
            </NavLink>

            {/* <div className="icon">Icon2</div> */}
            {isOpen && (
              <NavLink exact="true" to="/MaptalksPinPage">
                <Button size="large">
                  <span className="yellowcolor">Pin Places</span>
                </Button>
              </NavLink>
            )}
          </div>
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksRoutePage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-route"
              >
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                <circle cx="18" cy="5" r="3" />
              </svg>
            </NavLink>

            {/* <div className="icon">Icon3</div> */}
            {isOpen && (
              <NavLink exact="true" to="/MaptalksRoutePage">
                <Button size="large">
                  <span className="yellowcolor">Create Route</span>
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
