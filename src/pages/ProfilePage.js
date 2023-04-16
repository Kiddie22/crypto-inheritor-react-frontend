import { Avatar, Grid, TextField } from '@mui/material';
import UserStatus from '../components/UserStatus';
import useWeb3Data from '../hooks/useWeb3Data';

const ProfilePage = () => {
  const { nationalId } = useWeb3Data();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Profile</h1>
      <Avatar sx={{ width: 56, height: 56 }} />
      <UserStatus />

      <TextField
        label="National ID"
        defaultValue={nationalId}
        InputProps={{
          readOnly: true,
        }}
        disabled
      />
    </Grid>
  );
};

export default ProfilePage;
