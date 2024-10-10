import React, { useEffect, useState } from "react";

import RouteData from "../../../data/RouteData";
import { NavLink } from "react-router-dom";

const RouteListCard = () => {
  const [deviceData, setDeviceData] = useState([]); // State for the full data

  useEffect(() => {
    setDeviceData(RouteData); // Load the dummy data into state
  }, []);
  return (
    <div className="allStastics">
      <div className="Stastics-card">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d0ae06"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-route"
            >
              <circle cx="6" cy="19" r="3" />
              <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
              <circle cx="18" cy="5" r="3" />
            </svg>
          </p>
          <p className="Stastics-text-title textcenter">Saved Routes</p>
          <p className="Stastics-text-body  textcenter">
            There are a total of <strong>{deviceData.length}</strong> &nbsp;
            Routes are found on the system
          </p>
        </div>
        <NavLink exact="true" to="/RouteListPage">
          <button className="Stastics-card-button">Manage</button>
        </NavLink>
      </div>
    </div>
  );
};

export default RouteListCard;
