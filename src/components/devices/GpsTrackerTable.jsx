import React, { useEffect, useState } from "react";

const GpsTrackerTable = () => {
  const [deviceData, setDeviceData] = useState([]);

  // Simulating fetching data from a database (replace this with an actual API call)
  useEffect(() => {
    const fetchData = async () => {
      // Here you would fetch the data from your backend or API
      const dataFromDb = [
        {
          id: 1,
          deviceName: "Tracker 1",
          brand: "Brand A",
          model: "Model X",
          rfidKeys: ["12345", "67890"],
        },
        {
          id: 2,
          deviceName: "Tracker 2",
          brand: "Brand B",
          model: "Model Y",
          rfidKeys: ["11111", "22222", "33333"],
        },
        // Add more data as needed
      ];

      setDeviceData(dataFromDb);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>All GPS Tracker Devices</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>RFID Keys</th>
          </tr>
        </thead>
        <tbody>
          {deviceData.length > 0 ? (
            deviceData.map((device) => (
              <tr key={device.id}>
                <td>{device.deviceName}</td>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>
                  {device.rfidKeys.join(", ")}{" "}
                  {/* Display RFID keys as a comma-separated list */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GpsTrackerTable;
