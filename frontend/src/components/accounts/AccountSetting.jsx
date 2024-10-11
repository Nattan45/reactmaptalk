import React, { useState, useEffect } from "react";

import { Box, Select, MenuItem } from "@mui/material";

// Dummy function to simulate getting user data from a logged-in session
const getLoggedInUser = () => {
  // Example data: this should come from session storage, state, or API
  return {
    firstName: "John",
    lastName: "Doe",
    password: "",
    phoneNumber: "123-456-7890",
    email: "john.doe@example.com",
    userId: "12345",
    profilepicture: "", // Placeholder for profile picture
    gender: "male",
    accountLocation: "AddisAbaba",
    department: "it",
    role: "operator",
  };
};

const AccountSetting = () => {
  const [loggedInUser, setLoggedInUser] = useState(null); // For storing the logged-in user data
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = getLoggedInUser(); // Simulate fetching logged-in user data
    if (user) {
      setLoggedInUser(user);
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, updating the password, phone number, and email
    console.log("Updated Data:", { password, phoneNumber, email });
  };

  if (!loggedInUser) {
    return <p>User not logged in or anonymous user</p>; // Message if user is not logged in
  }

  return (
    <div className="registrationFormWithTable oneColumn">
      <form className="form heightfit width500" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-settings"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <p className="title textcenter">Update Account Information</p>
        </div>

        <br />

        <label className="textcenter formSectionTitles">Personality</label>

        {/* First Name (Non-editable) */}
        <label>
          <input
            type="text"
            value={loggedInUser.firstName}
            disabled
            className="input"
          />
        </label>

        {/* Last Name (Non-editable) */}
        <label>
          <input
            type="text"
            value={loggedInUser.lastName}
            disabled
            className="input"
          />
        </label>

        {/* Password (Editable) */}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </label>

        {/* Phone Number and Email (Editable) */}
        <div className="form-flex">
          <label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="input"
            />
            <span>Phone Number</span>
          </label>

          <label className="smallinputs">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <span>Email</span>
          </label>
        </div>

        {/* UserId (Non-editable) */}
        <label>
          <input
            type="text"
            value={loggedInUser.userId}
            disabled
            className="input"
          />
        </label>

        {/* Gender, Account Location, Department (Non-editable) */}
        <div
          className="form-flex threeGrid"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Select value={loggedInUser.gender} disabled className="input">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Select
              value={loggedInUser.accountLocation}
              disabled
              className="input"
            >
              <MenuItem value="AddisAbaba">Addis Ababa</MenuItem>
              <MenuItem value="Adama">Adama</MenuItem>
              <MenuItem value="Gigiga">Gigiga</MenuItem>
            </Select>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Select value={loggedInUser.department} disabled className="input">
              <MenuItem value="hr">Hr</MenuItem>
              <MenuItem value="it">It</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
            </Select>
          </Box>
        </div>

        {/* Role (Non-editable) */}
        <div className="roleContainer">
          <label className="formSectionTitles marginTop">Roles</label>
          <div className="roleChoise">
            <label>
              <input
                className="roleRadio"
                type="radio"
                value="admin"
                checked={loggedInUser.role === "admin"}
                disabled
              />
              Admin
            </label>
            <label>
              <input
                className="roleRadio"
                type="radio"
                value="operator"
                checked={loggedInUser.role === "operator"}
                disabled
              />
              Operator
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit userAccountSubmit">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default AccountSetting;
