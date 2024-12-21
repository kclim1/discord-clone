import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const OfflineIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        backgroundColor: "#747F8D", // Discord's grey for offline
        borderRadius: "50%", // Makes it circular
      }}
    >
      <FiberManualRecordIcon
        style={{
          fontSize: "10px", // Matches the container size
          color: "#747F8D", // Same grey color
        }}
      />
    </div>
  );
};
