import { toast } from "sonner";

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    unstyled: true,
    className: "bg-green-500 text-white font-bold text-center p-4 m-4 rounded-md flex items-center space-x-4",
    position: "bottom-right", // Center top position
    duration: 3000, // 3-second duration
  });
};

// Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      backgroundColor: "#F44336", // Error red
      color: "#ffffff", // White text
      fontWeight: "bold", // Bold text
      textAlign:"center"
      
    },
    position: "top-center", // Center top position
    duration: 3000, // 3-second duration
  });
};

// Info Toast
export const showInfoToast = (message) => {
  toast(message, {
    style: {
      backgroundColor: "#2196F3", // Info blue
      color: "#ffffff", // White text
      fontWeight: "bold", // Bold text
    },
    position: "top-center", // Center top position
    duration: 3000, // 3-second duration
  });
};

export const showWarningToast = (message) => {
    toast(message, {
      style: {
        backgroundColor: "#FFC107", // Warning yellow
        color: "#000000", // Black text
        fontWeight: "bold",
      },
      position: "top-center",
      duration: 3000,
    });
  };