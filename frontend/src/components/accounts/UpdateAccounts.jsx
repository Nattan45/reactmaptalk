import React, { useState, useEffect } from "react";

import axios from "axios";
import UserAccounts from "../../data/UserAccounts";
import { filterUsers } from "./filterUsers";
import UpdateAccountsPopup from "./UpdateAccountsPopup";
import { Button } from "@mui/material";
import MessagePopup from "../messageComponent/MessagePopup";

const UpdateAccounts = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(UserAccounts);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track popup visibility

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
          `${process.env.REACT_APP_API_URL}/api/users-id-list`
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

  // Handle user selection and clear the filter text
  const handleSelectUser = (user) => {
    setSelectedUser(user); // Set the selected user
    setFilterText(""); // Clear filter text after selection
    setIsPopupOpen(true); // Open the popup
  };

  // Filter users based on the input
  const filteredUsers = filterUsers(userList, filterText);

  return (
    <div>
      {/* Filter Input */}
      <div className="filters">
        <label className="textcenter formSectionTitles greenTitle">
          Enter the User Details to{" "}
          <span className="boldTitle">Update Account</span>
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
                {`${user.firstName} ${user.lastName}`}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Show the popup if a user is selected */}
      {selectedUser && (
        <UpdateAccountsPopup
          open={isPopupOpen} // Pass the popup visibility state
          user={selectedUser}
          onClose={() => setIsPopupOpen(false)} // Close popup
          onUpdate={(updatedUser) => {
            // Update user in the list after editing
            setUserList(
              userList.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
            setIsPopupOpen(false); // Close the popup after update
          }}
        />
      )}
      <MessagePopup messages={messages} removeMessage={removeMessage} />
    </div>
  );
};

export default UpdateAccounts;
