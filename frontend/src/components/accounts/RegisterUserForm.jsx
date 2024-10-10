import React, { useState } from "react";

import "./accounts.css";
import { Select, MenuItem, Box } from "@mui/material";

const RegisterUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [userId, setUserId] = useState("");
  const [gender, setGender] = useState("");
  const [accountLocation, setAccountLocation] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [role, setRole] = useState("operator"); // New state for role

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      password,
      phoneNumber,
      email,
      department,
      userId,
      role,
      gender,
      accountLocation,
      profilepicture,
    };
    console.log("Form Data:", formData);
    // Here you can send the formData to your API or backend
  };

  return (
    <div className="registrationFormWithTable oneColumn">
      <form className="form heightfit width500" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#a3a3a3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>

          <p className="title textcenter">Account Registration Form</p>
        </div>

        <br />

        <label className="textcenter formSectionTitles">Personality</label>

        {/* First Name */}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input"
          />
          <span>First Name:</span>
        </label>

        {/* Last Name */}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input"
          />
          <span>Last Name:</span>
        </label>

        {/* password */}
        <label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <span>Password</span>
        </label>

        {/* phone Number, Email */}
        <div className="form-flex">
          {/* phone Number */}
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

          {/* Email */}
          <label className="smallinputs">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <span>Email</span>
          </label>
        </div>

        {/* userId and Profile */}
        <div className="form-flex">
          {/* User Id */}
          <label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="input"
            />
            <span>User Id</span>
          </label>

          {/* profile_picture */}
          <label>
            <input
              type="file"
              value={profilepicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              required
              className="input"
            />
          </label>
        </div>

        {/* gender, account and department */}
        <div
          className="form-flex threeGrid"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          {/* Gender */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%", maxWidth: "150px" }} // Set maxWidth for better control
          >
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="input"
              fullWidth
            >
              <MenuItem value="" disabled>
                Gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Box>

          {/* Account Location */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%", maxWidth: "190px" }} // Set maxWidth for better control
          >
            <Select
              value={accountLocation}
              onChange={(e) => setAccountLocation(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="input"
              fullWidth // Ensures the dropdown fills the space within the box
            >
              <MenuItem value="" disabled>
                Account Location
              </MenuItem>
              <MenuItem value="AddisAbaba">Addis Ababa</MenuItem>
              <MenuItem value="Adama">Adama</MenuItem>
              <MenuItem value="Gigiga">Gigiga</MenuItem>
            </Select>
          </Box>

          {/* Department */}
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "100%", maxWidth: "150px" }} // Set maxWidth for better control
          >
            <Select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className="input"
              fullWidth // Ensures the dropdown fills the space within the box
            >
              <MenuItem value="" disabled>
                Department
              </MenuItem>
              <MenuItem value="hr">Hr</MenuItem>
              <MenuItem value="it">It</MenuItem>
              <MenuItem value="sales">Sales</MenuItem>
            </Select>
          </Box>
        </div>

        {/* Role */}
        <div className="roleContainer">
          <label className="formSectionTitles marginTop">Roles</label>
          <div className="roleChoise">
            <label>
              <input
                className="roleRadio"
                type="radio"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
            <label>
              <input
                className="roleRadio"
                type="radio"
                value="operator"
                checked={role === "operator"}
                onChange={(e) => setRole(e.target.value)}
              />
              Operator
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit userAccountSubmit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUserForm;
