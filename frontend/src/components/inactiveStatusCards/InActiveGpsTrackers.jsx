import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import MessagePopup from "../messageComponent/MessagePopup";
import axios from "axios";

const InActiveGpsTrackers = () => {
  const [inactiveDevices, setInactiveDevices] = useState(0); // State for total checkpoints

  // Message Toast
  const [messages, setMessages] = useState([]);
  // Add Message
  const addMessage = (text, type) => {
    const id = Date.now(); // Unique ID based on timestamp
    setMessages((prevMessages) => [...prevMessages, { id, text, type }]);
  };
  // Remove Message
  const removeMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Eseal = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/E-seal`
        );

        const activeEsealsCount = Eseal.data.filter(
          (eseal) => eseal.electronicSealStatus === "UNLOCKED"
        ).length;

        setInactiveDevices(activeEsealsCount);
      } catch (err) {
        if (err.response) {
          const errorMessage =
            err.response.data.errorMessage ||
            err.response.data.message ||
            "An error occurred: 500";
          addMessage(errorMessage, "error");
        } else {
          addMessage("Network error: Unable to reach the server.", "error");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="allStastics">
      <div className="Stastics-card red-card-outline">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
            <svg
              fill="red"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 502 502"
            >
              <g>
                <g>
                  <path
                    d="M0,94.122v351.562h502V94.122H0z M462.602,135.534v87.578l-18.487-4.17l-24.433-83.408H462.602z M291.257,135.534h112.092
			l23.276,79.465L287.4,183.6h-2.93L291.257,135.534z M249.044,135.534l-6.786,48.066H121.23l20.873-48.066H249.044z
			 M39.397,135.534h85.618L104.142,183.6h-2.594l-62.15-35.207L39.397,135.534L39.397,135.534z M166.882,422.463H37.308v-22.988
			h129.574V422.463z M216.44,366.467H39.397v-77.508l109.417-21.73l26.68,67.365h45.446L216.44,366.467z M394.506,428.385h-36.225
			V392.16h36.225V428.385z M455.81,428.385h-36.225V392.16h36.225V428.385z M462.602,366.467H258.652l4.5-31.873h199.448
			L462.602,366.467L462.602,366.467z M300.143,292.705c-11.841,13.93-29.472,22.793-49.143,22.793
			c-35.564,0-64.498-28.934-64.498-64.498c0-0.67,0.03-1.332,0.051-1.998l-11.707-29.559L39.397,246.346v-79.939l58.02,32.868
			h115.099c10.75-8.019,24.072-12.772,38.484-12.772c15.118,0,29.025,5.242,40.035,13.986l171.565,38.753v53.555L300.143,292.705z"
                  />
                  <path d="M317.19,56.316H184.809c-16.519,0-30.117,12.413-32.034,28.416h196.45C347.309,68.729,333.71,56.316,317.19,56.316z" />
                  <path
                    d="M251,201.501c-27.293,0-49.498,22.205-49.498,49.498c0,27.293,22.205,49.497,49.498,49.497s49.497-22.203,49.497-49.497
			C300.497,223.707,278.293,201.501,251,201.501z M251,284.783c-18.628,0-33.783-15.156-33.783-33.783
			c0-18.629,15.155-33.783,33.783-33.783s33.783,15.154,33.783,33.783C284.783,269.627,269.628,284.783,251,284.783z"
                  />
                  <circle cx="251" cy="251" r="20.494" />
                </g>
              </g>
            </svg>
          </p>
          <p className="Stastics-text-title textcenter">Inactive Devices</p>

          <p className="Stastics-text-body textcenter">{inactiveDevices}</p>
        </div>
        <NavLink
          to="/DevicesStatusPage"
          state={{ focusOnInactive: true }} // Correct format to pass state
        >
          <button className="Stastics-card-button">More info</button>
        </NavLink>
      </div>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default InActiveGpsTrackers;
