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
    <div className={sidebarClass} style={{ zIndex: "5" }}>
      <div className="collapsable">
        {/* Collapsable */}
        {isOpen ? (
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff700"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-from-line sidebar-toggle sidebarclose"
          >
            <path d="m9 6-6 6 6 6" />
            <path d="M3 12h14" />
            <path d="M21 19V5" />
          </svg>
        ) : (
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff700"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right-from-line sidebar-toggle "
          >
            <path d="M3 5v14" />
            <path d="M21 12H7" />
            <path d="m15 18 6-6-6-6" />
          </svg>
        )}

        <div className="navs">
          {/* MaptalksMyLocationPage */}
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksMyLocationPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin-plus-inside"
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

          {/* MaptalksPinPage */}
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksPinPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pin"
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

          {/* MaptalksRoutePage */}
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksRoutePage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd60a"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-route"
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

          {/* MaptalksCheckpointPage */}
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksCheckpointPage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 65 71"
                id="checkpoint"
              >
                <g fill="none" fillRule="evenodd">
                  <g fill="#d0ae06" transform="translate(-373 -390)">
                    <g transform="translate(373 390)">
                      <path d="M53.029 21.029c1.219 1.219 1.523 3.047.914 4.876-.61 1.828-2.438 2.743-4.267 2.743H44.8c.61 1.523.914 3.047.914 4.876 0 1.524 0 3.047-.914 4.571L33.524 59.124c0 .61-.61.914-1.22.914-.304 0-.914-.305-1.218-.914L19.81 38.4c-.61-1.524-.915-3.048-.915-4.571 0-1.829.305-3.353.915-4.877h-9.143v27.429c0 2.438-2.134 4.571-4.572 4.571H4.876c-2.438 0-4.571-2.133-4.571-4.571V4.571C.305 1.83 2.438 0 4.876 0h1.22c1.828 0 3.352.914 4.266 2.438h39.314c1.829 0 3.657.914 4.267 2.743.914 1.524.305 3.657-.914 4.876l-4.267 4.267c-.61.61-.61 1.524 0 2.133l4.267 4.572zM7.619 56.38V4.571c0-.914-.61-1.523-1.524-1.523H4.876c-.61 0-1.524.61-1.524 1.523v51.81c0 .914.61 1.524 1.524 1.524h1.22c.914 0 1.523-.915 1.523-1.524zm34.743-19.81c.305-.914.305-1.828.61-3.352 0-1.829-.305-3.352-1.22-4.876-.61-1.22-1.523-2.133-2.438-3.048-1.828-1.524-4.266-2.438-6.704-2.438-2.439 0-4.877.914-6.705 2.438-.915.915-1.829 1.829-2.438 3.048-.915 1.524-1.22 3.047-1.22 4.876 0 1.22.305 2.438.61 3.352l9.753 18.286 9.752-18.286zM51.2 24.686c0-.305.305-.915-.61-1.829l-4.266-4.267c-1.829-1.828-1.829-4.571 0-6.4l4.571-4.266c.61-.61.305-1.22.305-1.524-.305-.305-.61-.914-1.524-.914h-39.01V25.6h10.667c2.438-3.352 6.4-5.486 10.972-5.486 4.571 0 8.533 2.134 10.971 5.486h6.4c.914 0 1.524-.61 1.524-.914z"></path>
                      <path d="M35.048 28.648c-.915-.305-1.829-.61-2.743-.61-.915 0-1.829.305-2.743.61-1.829.914-3.048 3.047-3.048 5.18 0 3.353 2.743 5.791 5.79 5.791 3.048 0 5.791-2.743 5.791-5.79.305-2.134-1.219-4.267-3.047-5.181zm-2.743 7.923a2.731 2.731 0 0 1-2.743-2.742 2.731 2.731 0 0 1 2.743-2.743 2.731 2.731 0 0 1 2.743 2.743c.304 1.523-1.22 2.742-2.743 2.742z"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </NavLink>

            {/* <div className="icon">Icon3</div> */}
            {isOpen && (
              <NavLink exact="true" to="/MaptalksCheckpointPage">
                <Button size="large">
                  <span className="yellowcolor">Checkpoints</span>
                </Button>
              </NavLink>
            )}
          </div>

          {/* MaptalksWarehousePage */}
          <div className="nav-item">
            <NavLink exact="true" to="/MaptalksWarehousePage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d0ae06"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-warehouse"
              >
                <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
                <path d="M6 18h12" />
                <path d="M6 14h12" />
                <rect width="12" height="12" x="6" y="10" />
              </svg>
            </NavLink>

            {/* <div className="icon">Icon3</div> */}
            {isOpen && (
              <NavLink exact="true" to="/MaptalksWarehousePage">
                <Button size="large">
                  <span className="yellowcolor">Checkpoints</span>
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
