import React from "react";

import AllRfidList from "./AllRfidList";
import FreeRfid from "./FreeRfid";
import AssignedRfid from "../../activeStatusCards/AssignedRfid";

const RfidsStatus = () => {
  return (
    <div className="gridCenter">
      <div className="flexRowCenter">
        {/* Assigned */}
        <AssignedRfid />
        <div className="marginLeft">
          {/* Unassigned */}
          <FreeRfid />
        </div>
      </div>

      <div className="marginTB">
        <AllRfidList />
      </div>
    </div>
  );
};

export default RfidsStatus;
