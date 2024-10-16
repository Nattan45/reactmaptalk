export const formatRfidStatus = (status) => {
  if (!status) return ""; // Handle cases where status might be null or undefined

  return status
    .toLowerCase() // Convert to lowercase (e.g., "active_rfid")
    .split("_") // Split by underscore (e.g., ["active", "rfid"])
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter (e.g., ["Active", "Rfid"])
    .join(" "); // Join with a space (e.g., "Active Rfid")
};
