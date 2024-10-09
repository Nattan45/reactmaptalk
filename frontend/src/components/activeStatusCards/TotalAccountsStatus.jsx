import React, { useEffect, useState } from "react";

import Accounts from "../../data/UserAccounts";
import { NavLink } from "react-router-dom";

const TotalAccountsStatus = () => {
  const [allAccounts, setAllAccounts] = useState(0); // State for total checkpoints

  useEffect(() => {
    const allAccountsCount = Accounts.length;
    setAllAccounts(allAccountsCount);
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
              stroke="green"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </p>
          <p className="Stastics-text-title textcenter">Total Accounts</p>

          <p className="Stastics-text-body textcenter">{allAccounts}</p>
        </div>
        <NavLink
          exact="true"
          to="/AccountsStatusPage"
          state={{ focusOnAllUsers: true }} // Focus on AllUsers
        >
          <button className="Stastics-card-button">More info</button>
        </NavLink>
      </div>
    </div>
  );
};

export default TotalAccountsStatus;
