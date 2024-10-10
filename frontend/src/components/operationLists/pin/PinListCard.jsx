import React, { useEffect, useState } from "react";

import PinsData from "../../../data/PinsData";
import PinData from "../../../data/PinData";
import { NavLink } from "react-router-dom";

const PinListCard = () => {
  const [TotalPinData, setTotalPinData] = useState(0); // State for total warehouses

  useEffect(() => {
    // Calculate the total number of warehouses
    const totalFromPinsData = PinsData.reduce((total, category) => {
      return (
        total + (category.pinCoordinates ? category.pinCoordinates.length : 0)
      );
    }, 0);

    const totalFromPinData = PinData.length;

    // Set total number of warehouses
    setTotalPinData(totalFromPinsData + totalFromPinData);
  }, []);

  return (
    <div className="allStastics">
      <div className="Stastics-card">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
            {" "}
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
              className="lucide lucide-pin"
            >
              <path d="M12 17v5" />
              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
            </svg>
          </p>
          <p className="Stastics-text-title textcenter">Pin Locations</p>
          <p className="Stastics-text-body  textcenter">
            You Have total of <strong>{TotalPinData}</strong> Pinned Locations
          </p>
        </div>
        <NavLink exact="true" to="/PinListPage">
          <button className="Stastics-card-button">Check Pin</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PinListCard;
