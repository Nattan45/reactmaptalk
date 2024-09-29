import React from "react";

import "./tracker.css";

const TrackParameters = () => {
  return (
    <div className="trackParametersContainer">
      <div className="plateNumberQuerryForm">
        <form className="form wh-fit-content zerozero firstzerozero">
          <label>
            <input type="text" required className="input" />
            <span>Plate Number</span>
          </label>
          <button type="submit" className="submit wh-fit-content placeEnd">
            Track
          </button>
        </form>
      </div>
      <div className="driverIdQueryForm">
        <form className="form wh-fit-content zerozero">
          <label>
            <input type="text" required className="input" />
            <span>Driver ID</span>
          </label>
          <button type="submit" className="submit wh-fit-content placeEnd">
            Track
          </button>
        </form>
      </div>
      <div className="gpsIdQueryForm">
        <form className="form wh-fit-content zerozero">
          <label>
            <input type="text" required className="input" />
            <span>Gps ID</span>
          </label>
          <button type="submit" className="submit wh-fit-content placeEnd">
            Track
          </button>
        </form>
      </div>
      <div className="driverIdQueryForm">
        <form className="form wh-fit-content zerozero">
          <label>
            <input type="text" required className="input" />
            <span>Trip ID</span>
          </label>
          <button type="submit" className="submit wh-fit-content placeEnd">
            Track
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackParameters;
