import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import "./statusCard.css";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";

const AssignedRfidsStatus = () => {
  const [activeRfids, setActiveRfids] = useState(0);

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
        const activeRfidsCount = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/rfidkey`
        );

        const activeRfids = activeRfidsCount.data.filter(
          (rfid) => rfid.rfidStatus === "ASSIGNED"
        );

        setActiveRfids(activeRfids.length);
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
    <div className="">
      {/* actives Rfids */}
      <div className="allStastics">
        <div className="Stastics-card">
          <div className="Stastics-card-details">
            <p className="Stastics-text-title-icon">
              <svg
                fill="green"
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                // className="titleSvg"
              >
                <path d="M6.62012 16.4414V18H5.46289V13.7168H6.86621C8.03027 13.7168 8.6123 14.1387 8.6123 14.9824C8.6123 15.4785 8.37012 15.8623 7.88574 16.1338L9.13379 18H7.82129L6.91309 16.4414H6.62012ZM6.62012 15.5713H6.83691C7.24121 15.5713 7.44336 15.3926 7.44336 15.0352C7.44336 14.7402 7.24512 14.5928 6.84863 14.5928H6.62012V15.5713Z" />
                <path d="M10.6631 18H9.52344V13.7168H12.0547V14.6455H10.6631V15.4629H11.9463V16.3916H10.6631V18Z" />
                <path d="M12.7578 18V13.7168H13.9209V18H12.7578Z" />
                <path d="M18.4854 15.7676C18.4854 16.4824 18.2881 17.0332 17.8936 17.4199C17.501 17.8066 16.9482 18 16.2354 18H14.8496V13.7168H16.332C17.0195 13.7168 17.5498 13.8926 17.9229 14.2441C18.2979 14.5957 18.4854 15.1035 18.4854 15.7676ZM17.2842 15.8086C17.2842 15.416 17.2061 15.125 17.0498 14.9355C16.8955 14.7461 16.6602 14.6514 16.3438 14.6514H16.0068V17.0508H16.2646C16.6162 17.0508 16.874 16.9492 17.0381 16.7461C17.2021 16.541 17.2842 16.2285 17.2842 15.8086Z" />
                <path d="M17 9C17 10.1046 16.1046 11 15 11C13.8954 11 13 10.1046 13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9Z" />
                <path d="M10.0588 4L9 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V15L20 13.9412V20H4V4H10.0588Z" />
                <path d="M21.9469 12.9698C22.6169 11.7999 22.9998 10.4447 22.9998 9C22.9998 4.58172 19.4181 1 14.9998 1C13.5551 1 12.1999 1.38295 11.03 2.05287L12.0225 3.78965C12.8998 3.28721 13.9163 3 14.9998 3C18.3135 3 20.9998 5.68629 20.9998 9C20.9998 10.0835 20.7126 11.1 20.2102 11.9773L21.9469 12.9698Z" />
                <path d="M19.3418 11.4811C19.7605 10.75 19.9998 9.90293 19.9998 9C19.9998 6.23858 17.7612 4 14.9998 4C14.0969 4 13.2498 4.23934 12.5187 4.65804L13.5111 6.39483C13.9498 6.14361 14.458 6 14.9998 6C16.6567 6 17.9998 7.34315 17.9998 9C17.9998 9.54176 17.8562 10.05 17.605 10.4887L19.3418 11.4811Z" />
              </svg>

              {/* <svg
                fill="#08e605"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="30"
                height="30"
                viewBox="0 0 437.804 437.804"
                stroke="#08e605"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path d="M1.915,0v437.804h146.856h146.543h140.575V0H1.915z M412.843,414.758H295.314H158.308L94.974,351.43V93.13h316.829v259.872 H199.601l-47.653-47.652V161.624h207.38V298.6h-95.093l-17.803-17.803h48.042v-80.656h-80.644v80.656h0.718l-0.354,0.348 l40.5,40.495h127.661v-183.06H128.899v176.31l61.156,61.153h222.789V414.758L412.843,414.758z M412.843,70.09H71.931v290.88 l53.797,53.8H24.964V23.049h387.879V70.09z" />
                  </g>
                </g>
              </svg> */}
            </p>
            <p className="Stastics-text-title textcenter">Active Rfids</p>

            <p className="Stastics-text-body textcenter">{activeRfids}</p>
          </div>
          <NavLink exact="true" to="/RfidsStatusPage">
            <button className="Stastics-card-button">More info</button>
          </NavLink>
        </div>
      </div>

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};
export default AssignedRfidsStatus;
