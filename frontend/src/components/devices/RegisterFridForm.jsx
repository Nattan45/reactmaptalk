import React, { useState } from "react";

import AllRfidList from "./AllRfidList";
import { Select, MenuItem, Box } from "@mui/material";
import axios from "axios";
import MessagePopup from "../messageComponent/MessagePopup";
const validateRfid = require("./validateRfid"); // Import the validation function

const RegisterFridForm = () => {
  const [rfidType, setRfidType] = useState("");
  const [keyCode, setkeyCode] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Function to standardize rfidType
    const standardizeRfidType = (rfidType) => {
      return rfidType.toUpperCase().replace(" ", "_"); // Convert to uppercase and replace spaces with underscores
    };

    // Assuming `rfidType` is coming from a state or form input
    const rfidTypeInput = rfidType; // You need to pass the actual rfidType value from your form state

    const formData = {
      rfidType: standardizeRfidType(rfidTypeInput),
      keyCode,
    };

    const validationResult = validateRfid(formData);

    console.log(JSON.stringify(formData, null, 2));

    if (validationResult.valid) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/create/rfid`,
          formData
        );
        addMessage("Rfid Key Registered Successfully!", "success");
      } catch (err) {
        if (err.response) {
          const errorMessage =
            err.response.data.errorMessage || "An error occurred: 500";
          addMessage(errorMessage, "error");
        } else {
          addMessage("Network error: Unable to reach the server.", "error");
        }
      }
    }
  };

  return (
    <div className="registrationFormWithTable">
      <form className="form wh-fit-content" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            fill="#000000"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="titleSvg"
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
          <p className="title textcenter">RFID Registration Form</p>
        </div>
        <br />
        <br />

        <div className="form-flex">
          {/* Tag Type */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%", maxWidth: "150px" }} // Set maxWidth for better control
          >
            <Select
              value={rfidType}
              onChange={(e) => setRfidType(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="input"
              fullWidth
              required
            >
              <MenuItem value="" disabled>
                Tag Type
              </MenuItem>
              <MenuItem value="Passive RFID">Passive RFID</MenuItem>
              <MenuItem value="Active RFID">Active RFID</MenuItem>
            </Select>
          </Box>

          {/* RFID Key */}
          <label className="smallinputs">
            <input
              type="text"
              value={keyCode}
              onChange={(e) => setkeyCode(e.target.value)}
              required
              className="input"
            />
            <span>RFID Key</span>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit wh-fit-content placeEnd">
          Create RFID
        </button>
      </form>
      <AllRfidList />

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default RegisterFridForm;
