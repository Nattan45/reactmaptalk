import React from "react";

const AccountStastics = () => {
  return (
    <div className="DeviceStasticsContainer">
      {/* actives */}
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

            <p className="Stastics-text-body textcenter">32</p>
          </div>
          <button className="Stastics-card-button">More info</button>
        </div>
      </div>
      {/* inactives */}
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

            <p className="Stastics-text-body textcenter">3</p>
          </div>
          <button className="Stastics-card-button">More info</button>
        </div>
      </div>
      {/* Vehicle */}
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

            <p className="Stastics-text-body textcenter">29</p>
          </div>
          <button className="Stastics-card-button">More info</button>
        </div>
      </div>
    </div>
  );
};

export default AccountStastics;
