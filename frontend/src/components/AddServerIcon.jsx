import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// Styled Tooltip
export const ServerIconTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#6a0dad",
    color: "#fff", // White text
    boxShadow: theme.shadows[1],
    fontSize: "1rem", 
  },
}));

// Styled Icon Wrapper
export const ServerIconWrapper = styled("div")(() => ({
  display: "inline-block",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.2)", // Slightly enlarge the icon
    boxShadow: `0px 4px 10px 2px rgba(255, 0, 255, 0.8)`, // Intense purple shadow
    borderRadius:"50%",
     backgroundColor: "#6a0dad"
  },
}));


