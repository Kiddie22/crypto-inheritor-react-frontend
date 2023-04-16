import { Alert, Snackbar } from '@mui/material';

const ErrorSnackbar = ({ errorOpen, setErrorOpen }) => {
  return (
    <Snackbar
      open={errorOpen}
      autoHideDuration={6000}
      onClose={() => {
        setErrorOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setErrorOpen(false);
        }}
        severity="error"
        sx={{ width: '100%' }}
      >
        Transaction Failed!
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
