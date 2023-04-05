import { CircularProgress, Container, Grid } from '@mui/material';
import NewLocker from '../components/NewLocker';
import React, { useEffect, useState } from 'react';
import LockerTable from '../components/LockerTable';
import LockerFactoryContract from '../components/LockerFactoryContract';
import ActivateProvable from '../components/ActivateProvable';
import useWeb3Data from '../hooks/useWeb3Data';

const Home = () => {
  const web3Data = useWeb3Data();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (web3Data) {
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

  return (
    <Container>
      <LockerFactoryContract />
      <ActivateProvable />
      <NewLocker />
      <LockerTable />
    </Container>
  );
};

export default Home;
