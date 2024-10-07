import React from "react";

import "./stasticsCards.css";
import ActiveGpsTrackers from "../activeStatusCards/ActiveGpsTrackers";
import CheckpointsCard from "../operationLists/checkpoint/CheckpointsCard";
import WarehousesCard from "../operationLists/warehouse/WarehousesCard";
import RouteListCard from "../operationLists/route/RouteListCard";

const StasticsCards = () => {
  return (
    <div className="StasticsContainer">
      {/* Active Devices */}
      <ActiveGpsTrackers />

      {/* all Pin Locations */}
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
            <p className="Stastics-text-body">
              You Have total of 1567 Pinned Locations in a total of 49 Documents
            </p>
            <p className="Stastics-text-body textend smallfonts">19-9-2024</p>
          </div>
          <button className="Stastics-card-button">Check Pin</button>
        </div>
      </div>

      {/* all Route Maps */}
      <RouteListCard />

      {/* all Checkpoints Locations */}
      <CheckpointsCard />

      {/* all Warehouse Locations */}
      <WarehousesCard />
    </div>
  );
};

export default StasticsCards;
