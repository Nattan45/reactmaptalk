import React from "react";
import "./footer.css";

import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Footer = () => {
  return (
    <div className="footerContents">
      <div className="footerComponents">
        <div className="footerCompany">
          <NavLink exact="true" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8cff00"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-truck"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
              <circle cx="17" cy="18" r="2" />
              <circle cx="7" cy="18" r="2" />
            </svg>
          </NavLink>
          <NavLink exact="true" to="/">
            <Button color="success">
              <h3>Vehicle Tracking</h3>
            </Button>
          </NavLink>
        </div>

        <div className="footernaves">
          <NavLink exact="true" to="/SavedLocationsPage">
            <Button color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bee9e8"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map"
              >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                <path d="M15 5.764v15" />
                <path d="M9 3.236v15" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">Saved&nbsp;Location</h5>
            </Button>
          </NavLink>

          <NavLink exact="true" to="/">
            <Button color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bee9e8"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-waypoints"
              >
                <circle cx="12" cy="4.5" r="2.5" />
                <path d="m10.2 6.3-3.9 3.9" />
                <circle cx="4.5" cy="12" r="2.5" />
                <path d="M7 12h10" />
                <circle cx="19.5" cy="12" r="2.5" />
                <path d="m13.8 17.7 3.9-3.9" />
                <circle cx="12" cy="19.5" r="2.5" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">Saved&nbsp;Routes</h5>
            </Button>
          </NavLink>

          <NavLink exact="true" to="/">
            <Button color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bee9e8"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-land-plot"
              >
                <path d="m12 8 6-3-6-3v10" />
                <path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" />
                <path d="m6.49 12.85 11.02 6.3" />
                <path d="M17.51 12.85 6.5 19.15" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">Track</h5>
            </Button>
          </NavLink>

          <NavLink exact="true" to="/">
            <Button color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bee9e8"
                strokeWidth="0.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-a"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                <path d="m8 13 4-7 4 7" />
                <path d="M9.1 11h5.7" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">About</h5>
            </Button>
          </NavLink>
        </div>
      </div>

      <div className="footerSoclial">
        <Stack direction="row" spacing={2}>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0072b1"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </Button>

          <Button>
            <svg
              width="32"
              height="32"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g fillRule="evenodd" clipRule="evenodd">
                <path
                  fill="#E01E5A"
                  d="M2.471 11.318a1.474 1.474 0 001.47-1.471v-1.47h-1.47A1.474 1.474 0 001 9.846c.001.811.659 1.469 1.47 1.47zm3.682-2.942a1.474 1.474 0 00-1.47 1.471v3.683c.002.811.66 1.468 1.47 1.47a1.474 1.474 0 001.47-1.47V9.846a1.474 1.474 0 00-1.47-1.47z"
                />

                <path
                  fill="#36C5F0"
                  d="M4.683 2.471c.001.811.659 1.469 1.47 1.47h1.47v-1.47A1.474 1.474 0 006.154 1a1.474 1.474 0 00-1.47 1.47zm2.94 3.682a1.474 1.474 0 00-1.47-1.47H2.47A1.474 1.474 0 001 6.153c.002.812.66 1.469 1.47 1.47h3.684a1.474 1.474 0 001.47-1.47z"
                />

                <path
                  fill="#2EB67D"
                  d="M9.847 7.624a1.474 1.474 0 001.47-1.47V2.47A1.474 1.474 0 009.848 1a1.474 1.474 0 00-1.47 1.47v3.684c.002.81.659 1.468 1.47 1.47zm3.682-2.941a1.474 1.474 0 00-1.47 1.47v1.47h1.47A1.474 1.474 0 0015 6.154a1.474 1.474 0 00-1.47-1.47z"
                />

                <path
                  fill="#ECB22E"
                  d="M8.377 9.847c.002.811.659 1.469 1.47 1.47h3.683A1.474 1.474 0 0015 9.848a1.474 1.474 0 00-1.47-1.47H9.847a1.474 1.474 0 00-1.47 1.47zm2.94 3.682a1.474 1.474 0 00-1.47-1.47h-1.47v1.47c.002.812.659 1.469 1.47 1.47a1.474 1.474 0 001.47-1.47z"
                />
              </g>
            </svg>
          </Button>

          <Button>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 16C16 13.7909 17.7909 12 20 12C22.2091 12 24 13.7909 24 16C24 18.2091 22.2091 20 20 20C17.7909 20 16 18.2091 16 16Z"
                fill="#1ABCFE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 24C8 21.7909 9.79086 20 12 20H16V24C16 26.2091 14.2091 28 12 28C9.79086 28 8 26.2091 8 24Z"
                fill="#0ACF83"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4V12H20C22.2091 12 24 10.2091 24 8C24 5.79086 22.2091 4 20 4H16Z"
                fill="#FF7262"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 8C8 10.2091 9.79086 12 12 12H16V4H12C9.79086 4 8 5.79086 8 8Z"
                fill="#F24E1E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C8 18.2091 9.79086 20 12 20H16V12H12C9.79086 12 8 13.7909 8 16Z"
                fill="#A259FF"
              />
            </svg>
          </Button>

          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0033ff"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Button>

          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Gmail"
              role="img"
              viewBox="0 0 512 512"
            >
              <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4" />
              <path
                d="M 154 248l102 77l102-77v-98l-102 77l-102-77"
                fill="#ea4335"
              />
              <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853" />
              <path
                d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26"
                fill="#c5221f"
              />
              <path
                d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26"
                fill="#fbbc04"
              />
            </svg>
          </Button>
        </Stack>
      </div>

      <div className="footerFooter">
        <Button color="secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-copyright"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
          </svg>
          &nbsp;
          <h5 className="ddcolor">All Right Recived</h5>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
