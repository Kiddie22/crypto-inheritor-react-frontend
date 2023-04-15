import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';

export default function CreateLockerFactory() {
  const { addressAccount, cryptoInheritorContract } = useWeb3Data();
  const [isDisabled, setIsDisabled] = useState(false);

  const createLockerFactory = async () => {
    setIsDisabled(true);
    try {
      const response = await cryptoInheritorContract.methods
        .newLockerFactory()
        .send({ from: addressAccount });
      console.log(response);
      setIsDisabled(false);
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
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
    </Grid>
  );
}
