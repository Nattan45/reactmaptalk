import React, { useEffect, useState } from "react";

import axios from "axios";
import { NavLink } from "react-router-dom";

const OperatorAccountStatus = () => {
  const [operatorAccounts, setOperatorAccounts] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // the frontend backend(node js)
      .then((response) => {
        const data = response.data;

        // Count the number of OPERATORS account
        const operatorAccountsCount = data.filter(
          (account) => account.role === "OPERATOR"
        ).length;
        setOperatorAccounts(operatorAccountsCount);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
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
