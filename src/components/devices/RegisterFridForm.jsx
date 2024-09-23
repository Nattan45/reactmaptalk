import React, { useState } from "react";

const RegisterFridForm = () => {
  const [deviceName, setDeviceName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      deviceName,
      brand,
      model,
    };
    console.log("Form Data:", formData);
    // Here you can send the formData to your API or backend
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title textcenter">RFID Registration Form</p>

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
          <span>Tag Name</span>
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

      {/* Device Name */}
      <label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
          className="input"
        />
        <span>Key Number</span>
      </label>

      {/* Submit Button */}
      <button type="submit" className="submit">
        Register Device
      </button>
    </form>
  );
};

export default RegisterFridForm;
