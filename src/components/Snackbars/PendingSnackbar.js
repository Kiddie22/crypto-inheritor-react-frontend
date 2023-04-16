import { Alert, Snackbar } from '@mui/material';

const PendingSnackbar = ({ infoOpen, setInfoOpen }) => {
  return (
    <Snackbar
      open={infoOpen}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setInfoOpen(false);
      }}
    >
      <Alert
        onClose={() => {
          setInfoOpen(false);
        }}
        severity="info"
        sx={{ width: '100%' }}
      >
        Transaction Pending...
      </Alert>
    </Snackbar>
  );
};

export default PendingSnackbar;
