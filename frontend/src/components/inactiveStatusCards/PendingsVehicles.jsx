import React, { useEffect, useState } from "react";

import axios from "axios";
import { NavLink } from "react-router-dom";
import MessagePopup from "../messageComponent/MessagePopup";

const PendingsVehicles = () => {
  const [activeVehicles, setActiveVehicles] = useState(0);

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
        const activeVehiclesCount = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/vehicles`
        );

        const InactiveVehicles = activeVehiclesCount.data.filter(
          (vehicle) => vehicle.vehicleStatus === "PENDING"
        );

        setActiveVehicles(InactiveVehicles.length);
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
      <div className="Stastics-card yellow-card-outline">
        <div className="Stastics-card-details">
          <p className="Stastics-text-title-icon">
            <svg
              fill="#cccc1e"
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
          </p>
          <p className="Stastics-text-title textcenter">Pending Vehicles</p>

          <p className="Stastics-text-body textcenter">{activeVehicles}</p>
        </div>
        <NavLink
          to="/VehiclesStatusPage"
          state={{ focusOnInactive: true }} // Correct format to pass state
        >
          <button className="Stastics-card-button">More info</button>
        </NavLink>
      </div>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default PendingsVehicles;
