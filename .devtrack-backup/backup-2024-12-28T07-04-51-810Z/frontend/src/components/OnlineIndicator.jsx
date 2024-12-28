import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export const OnlineIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        backgroundColor: "#3ba55d", // Discord's green for online
        borderRadius: "50%", // Makes it circular
      }}
    >
      <FiberManualRecordIcon
        style={{
          fontSize: "10px", // Matches the container size
          color: "#3ba55d", // Same green color
        }}
      />
    </div>
  );
};
