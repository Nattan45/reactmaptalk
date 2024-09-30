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

          <NavLink exact="true" to="/DevicesPage">
            <Button color="secondary">
              <svg
                fill="#bee9e8"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="32px"
                height="32px"
                viewBox="0 0 54.9 54.9"
                space="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M44.885,12.23c-0.842-2.599-1.994-4.456-4.455-4.456H20.618V3.523c0-1.946-1.684-3.523-3.76-3.523 c-2.077,0-3.761,1.577-3.761,3.523c0,1.254,0,3.272,0,4.555c-1.513,0.641-2.407,2.263-2.972,4.152c0,0-1.633,11.68-1.633,19.108 c0,7.427,1.633,19.105,1.633,19.105c0.761,2.492,1.996,4.457,4.456,4.457H40.43c2.461,0,3.676-1.938,4.455-4.457 c0,0,1.594-12.272,1.521-19.105C46.364,23.687,44.885,12.23,44.885,12.23z M40.614,15.055v19.45c0,0.974-0.789,1.761-1.761,1.761 H15.97c-0.973,0-1.761-0.787-1.761-1.761v-19.45c0-0.973,0.788-1.76,1.761-1.76h22.883C39.825,13.296,40.614,14.083,40.614,15.055z M21.453,46.357h-6.398c-0.922,0-1.669-0.748-1.669-1.67s0.747-1.668,1.669-1.668h6.398c0.921,0,1.669,0.746,1.669,1.668 C23.121,45.609,22.373,46.357,21.453,46.357z M27.45,47.654c-1.639,0-2.967-1.326-2.967-2.967c0-1.64,1.328-2.967,2.967-2.967 c1.64,0,2.967,1.327,2.967,2.967C30.416,46.328,29.089,47.654,27.45,47.654z M40.227,46.357h-6.397 c-0.921,0-1.669-0.748-1.669-1.67s0.748-1.668,1.669-1.668h6.397c0.922,0,1.67,0.746,1.67,1.668S41.148,46.357,40.227,46.357z" />{" "}
                  </g>{" "}
                </g>
              </svg>
              &nbsp;
              <h5 className="ddcolor">Devices</h5>
            </Button>
          </NavLink>

          <NavLink exact="true" to="/TrackerPage">
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

          <NavLink exact="true" to="/VehiclesPage">
            <Button color="secondary">
              <svg
                fill="#bee9e8"
                height="32"
                width="32"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 612"
                xml="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M504.9,395.756c-28.684,0-52.02,23.342-52.02,52.02c0,28.684,23.336,52.02,52.02,52.02c28.678,0,52.02-23.336,52.02-52.02
			C556.92,419.098,533.578,395.756,504.9,395.756z M504.9,463.076c-8.439,0-15.3-6.861-15.3-15.3c0-8.439,6.861-15.3,15.3-15.3
			s15.3,6.861,15.3,15.3C520.2,456.215,513.339,463.076,504.9,463.076z"
                    />
                    <path
                      d="M499.918,179.518H410.04c-6.763,0-12.24,5.484-12.24,12.24v238.68c0,6.756,5.477,12.24,12.24,12.24h12.981
			c6.059,0,11.426-4.364,12.209-10.373c4.804-36.806,34.162-59.633,69.676-59.633s64.872,22.828,69.676,59.633
			c0.783,6.01,6.144,10.373,12.209,10.373h12.968c6.756,0,12.24-5.484,12.24-12.24v-119.34c0-2.876-1.01-5.655-2.852-7.852
			l-99.842-119.34C506.981,181.128,503.541,179.518,499.918,179.518z M422.28,277.438v-61.2c0-6.756,5.477-12.24,12.24-12.24h53.917
			c3.629,0,7.075,1.616,9.4,4.406l50.998,61.2c6.64,7.974,0.973,20.074-9.406,20.074H434.52
			C427.757,289.678,422.28,284.201,422.28,277.438z"
                    />
                    <path
                      d="M12.24,442.684h31.341c6.059,0,11.426-4.364,12.209-10.373c4.804-36.806,34.162-59.633,69.676-59.633
			s64.872,22.828,69.676,59.633c0.783,6.01,6.144,10.373,12.209,10.373H361.08c6.757,0,12.24-5.484,12.24-12.24v-306
			c0-6.756-5.484-12.24-12.24-12.24H12.24c-6.763,0-12.24,5.484-12.24,12.24v306C0,437.201,5.477,442.684,12.24,442.684z"
                    />
                    <path
                      d="M125.46,395.756c-28.684,0-52.02,23.342-52.02,52.02c0,28.684,23.336,52.02,52.02,52.02
			c28.678,0,52.02-23.336,52.02-52.02C177.48,419.098,154.138,395.756,125.46,395.756z M125.46,463.076
			c-8.439,0-15.3-6.861-15.3-15.3c0-8.439,6.861-15.3,15.3-15.3s15.3,6.861,15.3,15.3
			C140.76,456.215,133.899,463.076,125.46,463.076z"
                    />
                  </g>
                </g>
              </svg>
              &nbsp;
              <h5 className="ddcolor">Vehicle</h5>
            </Button>
          </NavLink>

          {/* Account  */}
          <NavLink exact="true" to="/AccountPage">
            <Button color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#bee9e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-cog"
              >
                <circle cx="18" cy="15" r="3" />
                <circle cx="9" cy="7" r="4" />
                <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                <path d="m21.7 16.4-.9-.3" />
                <path d="m15.2 13.9-.9-.3" />
                <path d="m16.6 18.7.3-.9" />
                <path d="m19.1 12.2.3-.9" />
                <path d="m19.6 18.7-.4-1" />
                <path d="m16.8 12.3-.4-1" />
                <path d="m14.3 16.6 1-.4" />
                <path d="m20.7 13.8 1-.4" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">Account</h5>
            </Button>
          </NavLink>

          {/* Trip  */}
          <NavLink exact="true" to="/TripPage">
            <Button color="secondary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.57385 20.3523L11.9553 13.5894C11.9737 13.5526 12.0263 13.5526 12.0447 13.5894L15.4261 20.3523C15.4483 20.3965 15.3996 20.4426 15.3566 20.4181L12.0248 18.5142C12.0094 18.5054 11.9906 18.5054 11.9752 18.5142L8.64338 20.4181C8.60043 20.4426 8.55173 20.3965 8.57385 20.3523Z"
                  stroke="#bee9e8"
                  strokeLinecap="round"
                />
                <path
                  d="M20.5 18.5L16.5 3.5"
                  stroke="#bee9e8"
                  strokeLinecap="round"
                />
                <path
                  d="M3.5 18.5L7.5 3.5"
                  stroke="#bee9e8"
                  strokeLinecap="round"
                />
                <path d="M12 10.5V8.5" stroke="#bee9e8" strokeLinecap="round" />
                <path d="M12 5.5V3.5" stroke="#bee9e8" strokeLinecap="round" />
              </svg>
              &nbsp;
              <h5 className="ddcolor">Trip</h5>
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
