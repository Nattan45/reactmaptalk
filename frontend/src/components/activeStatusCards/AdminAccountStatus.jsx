import React, { useEffect, useState } from "react";

// import Accounts from "../../data/UserAccounts";
import axios from "axios"; // Import Axios
import { NavLink } from "react-router-dom";

const AdminAccountStatus = () => {
  //  const [users, setUsers] = useState([]);
  const [adminAccounts, setAdminAccounts] = useState(0);

  useEffect(() => {
    // Fetch users using Axios
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`) // the frontend backend(node js)
      .then((response) => {
        const data = response.data;
        //  setUsers(data); // Set the fetched users

        // Count the number of admin accounts
        const adminAccountsCount = data.filter(
          (account) => account.role === "ADMIN"
        ).length;
        setAdminAccounts(adminAccountsCount); // Update the adminAccounts state
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
          <p className="Stastics-text-title textcenter">Admin Account</p>

          <p className="Stastics-text-body textcenter">{adminAccounts}</p>
        </div>
        <NavLink exact="true" to="/AccountsStatusPage">
          <button className="Stastics-card-button">More info</button>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminAccountStatus;
