import React, { useRef } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Button, Stack, TextField, Typography } from '@mui/material';

export default function NewLocker() {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  const lockerNameRef = useRef(null);
  const benefAddressRef = useRef(null);

  const createNewLocker = async (e) => {
    e.preventDefault();
    const name = lockerNameRef.current.value;
    const beneficiary = benefAddressRef.current.value;
    console.log({ name, beneficiary });
    if (lockerFactoryContract) {
      await lockerFactoryContract.methods
        .createNewLocker(name, beneficiary)
        .send({ from: addressAccount })
        .then((e) => {
          const status = e.status;
          if (status === true) {
            window.alert('New Locker Created');
          }
        });
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Create new Locker
      </Typography>
      <form onSubmit={createNewLocker}>
        <Stack direction="row" spacing={1} paddingBottom={3}>
          <TextField
            label="Locker Name"
            variant="outlined"
            size="small"
            inputRef={lockerNameRef}
            required
          />
          <TextField
            label="Beneficiary Address"
            variant="outlined"
            size="small"
            inputRef={benefAddressRef}
            required
          />
          <br />
          <Button type="submit" variant="contained" size="small">
            Create New Locker
          </Button>
        </Stack>
      </form>
    </>
  );
}
