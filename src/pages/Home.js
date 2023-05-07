import React from 'react';
import LockerFactoryDetails from '../components/LockerFactoryDetails';
import ActivateProvable from '../components/ActivateProvable';
import ProfilePage from './ProfilePage';
import useWeb3Data from '../hooks/useWeb3Data';
import WalletFundsCard from '../components/WalletFundsCard';
import CreateLockerFactory from '../components/CreateLockerFactory';
import { styled } from '@mui/system';
import { Alert, Box, Container, Grid, CircularProgress } from '@mui/material';
import NewLocker from '../components/NewLocker';
import LockerTable from '../components/LockerTable';
import AssetDistribution from '../components/AssetDistribution';

const WidgetBox = styled(Box)(({ theme }) => ({
  boxShadow: 2,
  padding: theme.spacing(2),
  minHeight: '250px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Home = () => {
  const web3Data = useWeb3Data();

  if (web3Data.isError) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Alert severity="error">{web3Data.isError}</Alert>
      </Grid>
    );
  }

  if (!web3Data.loadingComplete) {
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
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <ProfilePage />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <LockerFactoryDetails />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <ActivateProvable />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <NewLocker />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item md={9}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <LockerTable />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <WalletFundsCard />
              </WidgetBox>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box boxShadow={6} p={2}>
              <WidgetBox>
                <AssetDistribution />
              </WidgetBox>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
