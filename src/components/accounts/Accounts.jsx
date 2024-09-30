import React, { useState } from "react";

import AccountStastics from "./AccountStastics";
import RegisterUserForm from "./RegisterUserForm";
import AllAccounts from "./AllAccounts";
import RemoveAccount from "./RemoveAccount";

const Accounts = () => {
  // State to track which form is selected
  const [selectedForm, setSelectedForm] = useState("RegisterUser");

  // Handler for switching between forms
  const handleFormChange = (form) => {
    setSelectedForm(form);
  };
  return (
    <div className="devicesContainer">
      <div className="firstSection">
        <AccountStastics />
      </div>

      {/* Navigation section */}
      <div className="deviceChoice">
        <nav className="formNav">
          {/* Buttons for selecting the form */}
          <button
            className={selectedForm === "RegisterUser" ? "active" : ""}
            onClick={() => handleFormChange("RegisterUser")}
          >
            Register Users
          </button>

          <button
            className={selectedForm === "RemoveAccount" ? "active" : ""}
            onClick={() => handleFormChange("RemoveAccount")}
          >
            Remove User
          </button>

          {/* <button
            className={selectedForm === "ActiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("ActiveGPS")}
          >
            Active GPS
          </button> */}

          {/* <button
            className={selectedForm === "InactiveGPS" ? "active" : ""}
            onClick={() => handleFormChange("InactiveGPS")}
          >
            Inactive GPS
          </button> */}
        </nav>

        {/* Conditionally render the form based on user choice */}
        <div className="formContainer">
          {selectedForm === "RegisterUser" && <RegisterUserForm />}
          {selectedForm === "RemoveAccount" && <RemoveAccount />}
          {/* {selectedForm === "ActiveGPS" && <ActiveDevices />} */}
          {/* {selectedForm === "InactiveGPS" && <InactiveDevices />} */}
        </div>
      </div>

      {/* <div className="secondSection"></div> */}
      <div className="thirdSection">
        <AllAccounts />
      </div>
    </div>
  );
};

export default Accounts;
