import { Grid, TextField, Typography } from '@mui/material';
import UserStatus from '../components/UserStatus';
import useWeb3Data from '../hooks/useWeb3Data';
import ConnectedWalletChip from '../components/ConnectedWalletChip';

const ProfilePage = () => {
  const { username, nationalId } = useWeb3Data();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant='h6'>Profile</Typography>
      <ConnectedWalletChip />
      <UserStatus />
      <TextField
        label="Username"
        defaultValue={username}
        InputProps={{
          readOnly: true,
        }}
      />
      <br />
      <TextField
        label="National ID"
        defaultValue={nationalId}
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>
  );
};

export default ProfilePage;
