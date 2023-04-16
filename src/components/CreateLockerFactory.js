import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';
import PendingSnackbar from './Snackbars/PendingSnackbar';
import SuccessSnackbar from './Snackbars/SuccessSnackbar';
import ErrorSnackbar from './Snackbars/ErrorSnackbar';

export default function CreateLockerFactory() {
  const { addressAccount, cryptoInheritorContract } = useWeb3Data();
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const createLockerFactory = async () => {
    setIsDisabled(true);
    setInfoOpen(true);
    try {
      const response = await cryptoInheritorContract.methods
        .newLockerFactory()
        .send({ from: addressAccount });
      console.log(response);
      setIsDisabled(false);
      setInfoOpen(false);
      setSuccessOpen(true);
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
      style={{ minHeight: '90vh' }}
    >
      <p>Locker factory contract does not exist for this wallet</p>
      <Button
        onClick={() => {
          createLockerFactory();
        }}
        disabled={isDisabled}
        variant="contained"
      >
        Create Contract
      </Button>
      <PendingSnackbar infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <ErrorSnackbar errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
    </Grid>
  );
}
