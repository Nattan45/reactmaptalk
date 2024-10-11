import React, { useState, useEffect } from "react";

import axios from "axios";
import { validateFormData } from "./validation";
import { Modal, Box, TextField, Button } from "@mui/material";
import MessagePopup from "../messageComponent/MessagePopup";

const UpdateAccountsPopup = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    department: "",
    email: "",
    phoneNumber: "",
    gender: "",
    role: "",
  });

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

  // Populate form with user data when component is mounted
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userId: user.userId || "",
        department: user.department || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        gender: user.gender || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      addMessage(validationErrors.join(" "), "error");
      return;
    }

    try {
      const uppercasedRole = formData.role.toUpperCase();
      // Send the PUT request to update user details
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users-update/${user.id}`, // Ensure you're using user.id
        {
          department: formData.department,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          role: uppercasedRole,
        }
      );

      onSave(formData); // Call onSave to pass the updated data to the parent component
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data.errorMessage ||
          err.response.data.message ||
          "An error occurred: 500";
        addMessage(errorMessage, "error");
      } else {
        addMessage("Network error: Unable to reach the server.+++", "error");
      }
    }
    onClose(); // Close the modal after saving
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Edit User Account</h2>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            name="location"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </>
  );
};

export default UpdateAccountsPopup;
