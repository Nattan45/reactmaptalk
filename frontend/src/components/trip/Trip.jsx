import React, { useState } from "react";

import ActiveTripStatus from "./ActiveTripStatus";
import StartTripForm from "./StartTripForm";
import OngoingTrip from "../tracker/OngoingTrip";
import CompliteTripForm from "./CompliteTripForm";
import Warning from "./Warning";
import Problems from "./Problems";

const Trip = () => {
  // State to track which form is selected
  const [selectedForm, setSelectedForm] = useState("StartTripForm");

  // Handler for switching between forms
  const handleFormChange = (form) => {
    setSelectedForm(form);
  };

  return (
    <div className="savedLocationContainer">
      <div className="firstSection">
        <ActiveTripStatus />
      </div>

      {/* Navigation section */}
      <div className="deviceChoice">
        <nav className="formNav">
          {/* Buttons for selecting the form */}
          <div className="leftSide">
            {/* Start Trip Form */}
            <button
              className={selectedForm === "StartTripForm" ? "active" : ""}
              onClick={() => handleFormChange("StartTripForm")}
            >
              Start Trip Form
            </button>

            {/* Complite Trip Form */}
            <button
              className={selectedForm === "CompliteTripForm" ? "active" : ""}
              onClick={() => handleFormChange("CompliteTripForm")}
            >
              Complite Trip Form
            </button>
          </div>

          <hr />

          <div className="rightSide">
            {/* Warning */}
            <button
              className={selectedForm === "Warning" ? "active" : ""}
              onClick={() => handleFormChange("Warning")}
            >
              Warning
            </button>

            {/* Problems */}
            <button
              className={selectedForm === "Problems" ? "active" : ""}
              onClick={() => handleFormChange("Problems")}
            >
              Problems
            </button>
          </div>
        </nav>

        {/* Conditionally render the form based on user choice */}
        <div className="formContainer">
          {selectedForm === "StartTripForm" && <StartTripForm />}
          {selectedForm === "CompliteTripForm" && <CompliteTripForm />}
          {selectedForm === "Warning" && <Warning />}
          {selectedForm === "Problems" && <Problems />}
        </div>
      </div>

      <div className="thirdSection">
        <OngoingTrip />
      </div>
    </div>
  );
};

export default Trip;
