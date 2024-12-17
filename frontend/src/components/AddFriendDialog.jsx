import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

export const AddFriendDialog = () => {
  const [open, setOpen] = useState(false);
  const [addFriend, setAddFriend] = useState(""); // Input for friend profile ID

  // Open dialog
  const handleOpen = () => setOpen(true);

  // Close dialog and reset input
  const handleClose = () => {
    setOpen(false);
    setAddFriend("");
  };

  // Handle input change
  const handleChange = (event) => {
    setAddFriend(event.target.value);
  };

  // Handle form submission (mock functionality for now)
  const handleSubmit = () => {
    console.log("Sending friend request to Profile ID:", addFriend);
    handleClose();
  };

  return (
    <div>
      {/* Add Friend Icon */}
      <Tooltip title="Add Friend">
        <PersonAddAlt1Icon
          className="text-gray-300 cursor-pointer"
          onClick={handleOpen}
        />
      </Tooltip>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#2f3136", // Discord dark background
            color: "#ffffff", // White text
            borderRadius: "8px",
            width: "500px", // Set width
          },
        }}
      >
        <DialogTitle style={{ color: "#ffffff", fontWeight: "bold" }}>
          Add Friend
        </DialogTitle>

        <DialogContent>
          <p className="mb-4 text-[#b9bbbe]">
            Enter the Profile ID of your friend:
          </p>
          <TextField
            autoFocus
            fullWidth
            label="Profile ID"
            variant="outlined"
            value={addFriend}
            onChange={handleChange}
            InputProps={{
              style: {
                color: "#ffffff", // White input text
              },
            }}
            InputLabelProps={{
              style: {
                color: "#b9bbbe", // Light gray label text
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#5865f2" }, // Discord blue border
                "&:hover fieldset": { borderColor: "#6978f5" }, // Lighter blue hover
                "&.Mui-focused fieldset": { borderColor: "#5865f2" },
              },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#b9bbbe", // Default light gray text
              textTransform: "none", // No uppercase transformation
              transition: "all 0.2s ease-in-out", // Smooth transition
              "&:hover": {
                color: "#ffffff", // White text on hover
                backgroundColor: "#40444b", // Darker gray (Discord-like hover effect)
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#5865f2", // Default Discord blue
              color: "#ffffff", // White text
              textTransform: "none",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#4752c4", // Darker Discord blue
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow
              },
            }}
          >
            Add Friend
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
