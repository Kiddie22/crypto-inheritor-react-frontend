import {
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';

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
      <Alert severity="info" icon={false} style={{ width: '100%' }}>
        <Stack direction="row" spacing={3} style={{ width: '220px' }}>
          <Typography>Transaction Pending...</Typography>
          <CircularProgress size="20px" />
        </Stack>
      </Alert>
    </Snackbar>
  );
};

export default PendingSnackbar;
