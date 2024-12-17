
import { create } from 'zustand';

 const useSnackbarStore = create((set) => ({
  open: false,
  message: '',
  severity: 'info',

  setSnackbar: ({ message, severity }) =>
    set(() => ({
      open: true,
      message,
      severity,
    })),

  // Function to close the Snackbar
  closeSnackbar: () =>
    set(() => ({
      open: false,
      message: '',
    })),
}));

export default useSnackbarStore;


