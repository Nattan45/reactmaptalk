import React, { useState, useEffect } from "react";

import Drivers from "../../data/Drivers";
import FreeDrivers from "../driver/FreeDrivers";

const VehicleRegistration = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [driverId, setDriverId] = useState(""); // Updated to string
  const [driverName, setDriverName] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      vehicleName,
      brand,
      model,
      driverId,
    };
    console.log("Form Data:", formData);
    // Here you can send the formData to your API or backend
  };

  // Function to find driver by driverId from dummy data
  const findDriverName = (id) => {
    const foundDriver = Drivers.find((driver) => driver.driverId === id);
    return foundDriver ? foundDriver.driverName : "Driver not found";
  };

  // Fetch driver name when driverId changes
  useEffect(() => {
    if (driverId) {
      const name = findDriverName(driverId);
      setDriverName(name);
    }
  }, [driverId]);

  return (
    <div className="registrationFormWithTable">
      <form className="form heightfit" onSubmit={handleSubmit}>
        <div className="formTitle">
          <svg
            // fill="#d0ae06"
            fill="black"
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
          <p className="title textcenter">Vehicle Registration Form</p>
        </div>
        <br />
        <label className="textcenter">Vehicle</label>
        {/* Vehicle Name */}
        <label>
          <input
            type="text"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            required
            className="input"
          />
          <span>Vehicle Name:</span>
        </label>
        <div className="form-flex">
          {/* Brand */}
          <label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="input"
            />
            <span>Brand</span>
          </label>

          {/* Model */}
          <label className="smallinputs">
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="input"
            />
            <span>Model</span>
          </label>
        </div>
        <br />

        <label className="textcenter">Driver</label>
        {/* Driver Name */}
        <div className="driverForm">
          <label className="driverLabel">
            <div className="driverInputSection">
              {/* Input for Driver ID */}
              <input
                type="text"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                required
                className="driverInput"
                placeholder="Driver ID"
              />
              <span className="driverLabelText">Driver Name</span>
            </div>

            {/* Display Driver Name on the right side of the input */}
            <div className="driverNameSection">
              {driverName ? (
                <span className="driverName">{driverName}</span>
              ) : (
                <span className="driverName">Waiting for ID...</span>
              )}
            </div>
          </label>
        </div>
        <br />
        {/* Submit Button */}
        <button type="submit" className="submit">
          Register
        </button>
      </form>
      <FreeDrivers />
    </div>
  );
};
export default VehicleRegistration;
