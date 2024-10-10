import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import WarehousesData from "../../../data/WarehousesData"; // Multi-Warehouses data
import WarehouseData from "../../../data/WarehouseData"; // Single Warehouse data

const WarehousesCard = () => {
  const [totalWarehouses, setTotalWarehouses] = useState(0); // State for total warehouses

  useEffect(() => {
    // Calculate the total number of warehouses
    const totalFromWarehousesData = WarehousesData.reduce((total, category) => {
      return (
        total + (category.warehouseList ? category.warehouseList.length : 0)
      );
    }, 0);

    const totalFromWarehouseData = WarehouseData.length;

    // Set total number of warehouses
    setTotalWarehouses(totalFromWarehousesData + totalFromWarehouseData);
  }, []);
  return (
    <div className="allStastics">
      <div className="Stastics-card">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
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
          </p>
          <p className="Stastics-text-title textcenter">All Warehouses</p>
          <p className="Stastics-text-body textcenter">
            There are a total of <strong>{totalWarehouses}</strong>&nbsp; are
            Registered On the System
          </p>
        </div>
        <NavLink exact="true" to="/WarehouseListPage">
          <button className="Stastics-card-button">Manage</button>
        </NavLink>
      </div>
    </div>
  );
};

export default WarehousesCard;
