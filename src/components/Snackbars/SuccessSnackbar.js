import { Alert, Snackbar } from '@mui/material';

const SuccessSnackbar = ({ successOpen, setSuccessOpen }) => {
  return (
    <Snackbar
      open={successOpen}
      autoHideDuration={6000}
      onClose={() => {
        setSuccessOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setSuccessOpen(false);
        }}
        severity="success"
        sx={{ width: '100%' }}
      >
        Transaction Complete!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
