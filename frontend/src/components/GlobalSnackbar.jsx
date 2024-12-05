import { Snackbar, Alert } from '@mui/material';
import useSnackbarStore from '../../store/snackbarStore';

const GlobalSnackbar = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <div>
        {/* buttons to test snackbars  */}
      {/* <button
        onClick={() => useSnackbarStore.getState().setSnackbar({ message: 'This is an informational message', severity: 'info' })}
      >
        Show Info Snackbar
      </button>
      <button
        onClick={() => useSnackbarStore.getState().setSnackbar({ message: 'This is an error message', severity: 'error' })}
      >
        Show Error Snackbar
      </button> */}
      
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GlobalSnackbar