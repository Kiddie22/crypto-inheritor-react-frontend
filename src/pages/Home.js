import { Container, Grid } from '@mui/material';
import NewLocker from '../components/NewLocker';
import React from 'react';
import UserDetails from '../components/UserDetails';
import LockerTable from '../components/LockerTable';
import LockerFactoryContract from '../components/LockerFactoryContract';
import ActivateProvable from '../components/ActivateProvable';

const Home = () => {
  return (
    <Container>
      {/* <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      > */}
      <UserDetails />
      <LockerFactoryContract />
      <ActivateProvable />
      <NewLocker />
      <LockerTable />
      {/* </Grid> */}
    </Container>
  );
};

export default Home;
