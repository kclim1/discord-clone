import { Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PurpleTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#6a0dad", // Purple background
    color: "#fff", // White text
    boxShadow: theme.shadows[1],
    fontSize: "1rem", // Adjust font size if needed
  },
}));

export const IconWrapper = styled("div")(() => ({
  display: "inline-block",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: `0px 4px 15px 2px rgba(255, 0, 255, 0.8)`, // Purple shadow
    borderRadius: "50%",
    backgroundColor: "#6a0dad", // Purple background on hover
   
  },
}));
