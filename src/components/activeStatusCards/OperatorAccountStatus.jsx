import React, { useEffect, useState } from "react";

import Accounts from "../../data/UserAccounts";
import { NavLink } from "react-router-dom";

const OperatorAccountStatus = () => {
  const [operatorAccounts, setOperatorAccounts] = useState(0); // State for total checkpoints

  useEffect(() => {
    const operatorAccountsCount = Accounts.filter(
      (accounts) => accounts.role === "Operator"
    ).length;
    setOperatorAccounts(operatorAccountsCount);
  }, []);

  return (
    <div className="allStastics">
      <div className="Stastics-card yellow-card-outline">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </p>
          <p className="Stastics-text-title textcenter">Operators</p>

          <p className="Stastics-text-body textcenter">{operatorAccounts}</p>
        </div>
        <NavLink
          exact="true"
          to="/AccountsStatusPage"
          state={{ focusOnInactive: true }}
        >
          <button className="Stastics-card-button">More info</button>
        </NavLink>
      </div>
    </div>
  );
};

export default OperatorAccountStatus;
