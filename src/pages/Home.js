import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LockerFactoryDetails from '../components/LockerFactoryDetails';
import ActivateProvable from '../components/ActivateProvable';
import useWeb3Data from '../hooks/useWeb3Data';
import CreateLockerFactory from '../components/CreateLockerFactory';

const Home = () => {
  const web3Data = useWeb3Data();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (web3Data) {
      console.log(web3Data);
      setIsLoading(false);
    }
  }, [web3Data, setIsLoading]);

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

  if (!web3Data.lockerFactoryContract) {
    return <CreateLockerFactory />;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <LockerFactoryDetails />
      <ActivateProvable />
    </Grid>
  );
};

export default Home;
