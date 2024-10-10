import React, { useState } from "react";
import AllDriversList from "../activeStatusList/drivers/AllDriversList";

const DriverRegistration = () => {
  const [driverId, setDriverId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    const driverName = firstname;
    e.preventDefault();
    const formData = {
      driverId,
      driverName,
      firstname,
      lastname,
      phoneNumber,
    };
    console.log("Form Data:", formData);
    // Here you can send the formData to your API or backend
  };

  return (
    <div className="registrationFormWithTable">
      <form className="form wh-fit-content" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            width="32"
            height="32"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0549 39H23V31.0549C18.8284 31.5161 15.5161 34.8284 15.0549 39ZM25 31.0549V39H32.9451C32.4839 34.8284 29.1716 31.5161 25 31.0549ZM32.9452 41C32.8055 42.2647 32.4041 43.4491 31.7966 44.4993L33.5278 45.5007C34.4643 43.8818 35 42.0019 35 40C35 33.9249 30.0751 29 24 29C17.9249 29 13 33.9249 13 40C13 42.0019 13.5357 43.8818 14.4722 45.5007L16.2034 44.4993C15.5959 43.4491 15.1945 42.2647 15.0548 41H32.9452Z"
              fill="black"
            />
            <path
              d="M27 40C27 41.6569 25.6569 43 24 43C22.3431 43 21 41.6569 21 40C21 38.3431 22.3431 37 24 37C25.6569 37 27 38.3431 27 40Z"
              fill="black"
            />
            <path
              d="M31.5846 36.8449C31.2987 35.778 31.9319 34.6813 32.9988 34.3954L34.9307 33.8778C35.9976 33.5919 37.0943 34.2251 37.3801 35.292L38.4154 39.1557C38.7013 40.2227 38.0681 41.3193 37.0012 41.6052L35.0694 42.1229C34.0024 42.4087 32.9058 41.7756 32.6199 40.7086L31.5846 36.8449Z"
              fill="black"
            />
            <path
              d="M10.6199 35.2912C10.9058 34.2243 12.0024 33.5911 13.0694 33.877L15.0012 34.3947C16.0681 34.6805 16.7013 35.7772 16.4154 36.8441L15.3802 40.7078C15.0943 41.7748 13.9976 42.4079 12.9307 42.1221L10.9988 41.6044C9.93188 41.3185 9.29871 40.2219 9.5846 39.1549L10.6199 35.2912Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 17V14H17V17C17 20.866 20.134 24 24 24C27.866 24 31 20.866 31 17V14H33V17C33 21.9706 28.9706 26 24 26C19.0294 26 15 21.9706 15 17Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7943 11H34.2494C34.3213 10.8165 34.3989 10.6002 34.4762 10.3526L34.4883 10.3139C34.758 9.45061 35 8.67596 35 7.09677C35 6.29597 34.4797 5.62166 33.791 5.08848C33.0932 4.54829 32.1402 4.08579 31.0787 3.7088C28.9529 2.95383 26.2719 2.5 24 2.5C21.7281 2.5 19.0471 2.95383 16.9213 3.7088C15.8598 4.08579 14.9068 4.54829 14.209 5.08848C13.5203 5.62166 13 6.29597 13 7.09677C13 8.56283 13.2452 9.33549 13.4971 10.1295L13.4971 10.1295C13.5206 10.2035 13.5441 10.2776 13.5675 10.3525C13.6448 10.6001 13.7224 10.8164 13.7943 11ZM20 8C20 7.44772 20.4477 7 21 7H27C27.5523 7 28 7.44772 28 8C28 8.55228 27.5523 9 27 9H21C20.4477 9 20 8.55228 20 8Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.0214 13.4106C14.0668 13.1728 14.2845 13 14.5386 13H33.4614C33.7155 13 33.9332 13.1728 33.9786 13.4106L33.9788 13.4118L33.9791 13.413L33.9796 13.4159L33.9808 13.4227L33.9837 13.4409C33.9858 13.455 33.9882 13.4731 33.9905 13.4948C33.9951 13.5383 33.9993 13.5967 33.9999 13.6678C34.0011 13.8101 33.988 14.0048 33.9341 14.2341C33.8251 14.6976 33.5533 15.2868 32.9308 15.8594C31.6967 16.9946 29.1612 18 24 18C18.8388 18 16.3033 16.9946 15.0692 15.8594C14.4467 15.2868 14.1749 14.6976 14.0659 14.2341C14.012 14.0048 13.9989 13.8101 14.0001 13.6678C14.0007 13.5967 14.0049 13.5383 14.0095 13.4948C14.0118 13.4731 14.0142 13.455 14.0163 13.4409L14.0192 13.4227L14.0204 13.4159L14.0209 13.413L14.0212 13.4118L14.0214 13.4106Z"
              fill="black"
            />
          </svg>
          <p className="title textcenter">Driver Registration Form</p>
        </div>
        <br />
        <br />

        <div className="form-flex">
          {/* Brand */}
          <label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              requiblack="true"
              className="input"
            />
            <span>First Name</span>
          </label>

          {/* Model */}
          <label className="smallinputs">
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              requiblack="true"
              className="input"
            />
            <span>Last Name</span>
          </label>
        </div>

        {/* Device ID */}
        <label>
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            requiblack="true"
            className="input"
          />
          <span>Driver Id</span>
        </label>
        <label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            requiblack="true"
            className="input"
          />
          <span>Phone Number</span>
        </label>

        {/* Submit Button */}
        <button type="submit" className="submit wh-fit-content placeEnd">
          Register Driver
        </button>
      </form>
      <AllDriversList />
    </div>
  );
};

export default DriverRegistration;