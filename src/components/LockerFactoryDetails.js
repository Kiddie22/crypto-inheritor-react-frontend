import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';
import FactoryInfo from './FactoryInfo';

export default function LockerFactoryContract() {
  const { lockerFactoryContractAddress } = useWeb3Data();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (lockerFactoryContractAddress) {
      setIsLoading(false);
    }
  }, [lockerFactoryContractAddress, setIsLoading]);

  if (isLoading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        LockerFactory Contract
      </Typography>
      <p>{lockerFactoryContractAddress}</p>
      <FactoryInfo />
    </Box>
  );
}
