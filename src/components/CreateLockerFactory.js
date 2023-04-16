import React, { useRef, useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';
import PendingSnackbar from './Snackbars/PendingSnackbar';
import SuccessSnackbar from './Snackbars/SuccessSnackbar';
import ErrorSnackbar from './Snackbars/ErrorSnackbar';

export default function CreateLockerFactory() {
  const { addressAccount, cryptoInheritorContract, setRefresh } = useWeb3Data();
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const nameRef = useRef(null);
  const nationalIdRef = useRef(null);

  const createLockerFactory = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      setInfoOpen(true);
      const username = nameRef.current.value;
      const nationalId = nationalIdRef.current.value;
      await cryptoInheritorContract.methods
        .newLockerFactory(username, nationalId)
        .send({ from: addressAccount });
      await fetch('https://crypto-inheritor-backend.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, nationalId }),
      });
      setIsDisabled(false);
      setInfoOpen(false);
      setSuccessOpen(true);
      setRefresh(true);
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
      setInfoOpen(false);
      setErrorOpen(true);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '75vh' }}
    >
      <p>Locker factory contract does not exist for this wallet</p>
      <form onSubmit={createLockerFactory}>
        <Stack spacing={1}>
          <TextField
            placeholder="Full Name"
            inputRef={nameRef}
            size="small"
            required
          />
          <TextField
            placeholder="National ID"
            inputRef={nationalIdRef}
            size="small"
            required
          />
          <Button disabled={isDisabled} variant="contained" type="submit">
            Create Contract
          </Button>
        </Stack>
      </form>
      <PendingSnackbar infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <ErrorSnackbar errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
    </Grid>
  );
}
