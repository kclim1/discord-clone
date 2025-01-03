import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtil";
import { useParams } from "react-router-dom";
import { useProfileStore } from "../../../store/useProfileStore";
import { useFriendsStore } from "../../../store/useFriendsStore";

export const AddFriendDialog = () => {
  const { setSenderId } = useFriendsStore(); // Zustand store for sender ID
  const { profileId } = useParams(); // Current user's profile ID from URL
  const [open, setOpen] = useState(false); 
  const [receiverId, setReceiverId] = useState(""); // Input for friend's profile ID
  const { user } = useProfileStore(); // Fetch user details from Zustand
  const { username, profilePic } = user; 

  // Open the dialog
  const handleOpen = () => setOpen(true);

  // Close the dialog and reset state
  const handleClose = () => {
    setOpen(false);
    setReceiverId("");
  };

  // Handle changes in the input field
  const handleChange = (event) => {
    setReceiverId(event.target.value); // Set receiver ID to input value
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const senderId = profileId; // Sender is the current user
      setSenderId(senderId); // Update sender ID in Zustand store
      console.log({
        senderId,
        receiverId,
        username,
        profilePic,
      });
      // Send friend request to backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_ROUTE}/friend-requests/${profileId}`, {
        senderId, 
        receiverId,
        username, 
        profilePic, 
      });
      console.log(response);
      // Show a success toast if the request is successful
      if (response.status === 200) {
        showSuccessToast("Friend request sent!");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      showErrorToast("Oops! Error sending friend request");
    } finally {
      handleClose();
    }
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
            width: "500px", // Set dialog width
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
            value={receiverId} // Controlled input
            onChange={handleChange} // Handle input change
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
                backgroundColor: "#40444b", // Darker gray hover effect
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
              textTransform: "none", // No uppercase transformation
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
