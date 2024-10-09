import React from "react";

import "./stasticsCards.css";
import ActiveGpsTrackers from "../activeStatusCards/ActiveGpsTrackers";
import CheckpointsCard from "../operationLists/checkpoint/CheckpointsCard";
import WarehousesCard from "../operationLists/warehouse/WarehousesCard";
import RouteListCard from "../operationLists/route/RouteListCard";
import PinListCard from "../operationLists/pin/PinListCard";

const StasticsCards = () => {
  return (
    <div className="StasticsContainer">
      {/* Active Devices */}
      <ActiveGpsTrackers />

      {/* all Pin Locations */}
      <PinListCard />

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
