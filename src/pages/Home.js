import { load } from '../funcs';
import { Box, Container } from '@mui/material';
import NewLocker from '../components/NewLocker';
import React from 'react';
import UserDetails from '../components/UserDetails';
import LockerTable from '../components/LockerTable';
import LockerFactoryContract from '../components/LockerFactoryContract';
import ActivateProvable from '../components/ActivateProvable';

const Home = () => {
  return (
    <Container>
      <UserDetails />
      <LockerFactoryContract />
      <ActivateProvable />
      <NewLocker />
      <LockerTable />
    </Container>
  );
};

export default Home;
