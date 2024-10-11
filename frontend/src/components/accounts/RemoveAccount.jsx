import React, { useState, useEffect } from "react";

import axios from "axios";
import Button from "@mui/material/Button";
import { filterUsers } from "./filterUsers"; // filter function for user data
import MessagePopup from "../messageComponent/MessagePopup";

const RemoveAccount = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);

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

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the GET request using Axios
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users-id`
        );

        // Pass the data to state
        setUserList(response.data);
      } catch (err) {
        // Check if the error response exists and handle accordingly
        if (err.response) {
          const errorMessage =
            err.response.data.errorMessage ||
            err.response.data.message ||
            "An error occurred: 500";
          addMessage(errorMessage, "error"); // Show error message using your popup
        } else {
          addMessage("Network error: Unable to reach the server.", "error");
        }
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user when chosen
    setFilterText(""); // Reset the filter text
  };

  // Function to handle user removal
  const handleRemoveUser = async (id) => {
    try {
      console.log(id, "++++++++++");
      // Send a DELETE request to the backend to remove the user by ID
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user/remove/${id}`
      );

      addMessage("User Deleted successfully!", "success");
      // Update the user list after removal
      setUserList(userList.filter((user) => user.id !== id));
      setSelectedUser(null); // Clear selection after removal
    } catch (err) {
      // Check if the error response exists and handle accordingly
      if (err.response) {
        const errorMessage =
          err.response.data.errorMessage ||
          err.response.data.message ||
          "An error occurred: 500";
        addMessage(errorMessage, "error"); // Show error message using your popup
      } else {
        addMessage("Network error: Unable to reach the server.", "error");
      }
    }
  };

  const filteredUsers = filterUsers(userList, filterText);

  return (
    <div>
      {/* Filter Input */}
      <div className="filters">
        <label className="textcenter formSectionTitles redTitle">
          Enter the User Details to{" "}
          <span className="boldTitle">Delete Account</span>
        </label>
        <br />
        <input
          placeholder="Name, ID, phone, email ..."
          type="text"
          className="inputFilter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Dropdown for filtered users */}
      {filterText && filteredUsers.length > 0 && (
        <ul className="dropdown">
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              <Button variant="text" color="primary">
                {`${user.firstName} ${user.lastName} (${user.userId})`}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Display selected user in card */}
      {selectedUser && (
        <div className="form heightfit">
          <label className="textcenter formSectionTitles">Selected User</label>

          <p className="input">
            <strong>Name:</strong>{" "}
            {`${selectedUser.firstName} ${selectedUser.lastName}`}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser.username}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>User ID:</strong> {selectedUser.userId}
          </p>
          <p>
            <strong>Location:</strong> {selectedUser.accountlocation}
          </p>
          <p>
            <strong>Department:</strong> {selectedUser.department}
          </p>
          <Button
            variant="text"
            color="error"
            onClick={() => handleRemoveUser(selectedUser.id)}
          >
            Remove User
          </Button>
        </div>
      )}

      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default RemoveAccount;
