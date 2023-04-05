import { Avatar, Button, Grid, TextField } from '@mui/material';
import UserStatus from '../components/UserStatus';
import useWeb3Data from '../hooks/useWeb3Data';
import { useRef } from 'react';

const ProfilePage = () => {
  const { lockerFactoryContract, addressAccount, nationalId } = useWeb3Data();
  const nationalIdRef = useRef();

  const setNationalId = async () => {
    const result = await lockerFactoryContract.methods
      .setNationalId('20191118')
      .send({ from: addressAccount });
    console.log(result);
  };

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
      {nationalId === 'undefined' ? (
        <>
          <TextField label="National ID" inputRef={nationalIdRef} />
          <Button onClick={setNationalId} variant="contained">
            Set ID
          </Button>
        </>
      ) : (
        <TextField
          label="National ID"
          defaultValue={nationalId}
          InputProps={{
            readOnly: true,
          }}
          disabled
        />
      )}
    </Grid>
  );
};

export default ProfilePage;
