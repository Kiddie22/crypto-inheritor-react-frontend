import { load } from '../funcs';
import { Box } from '@mui/material';
import NewLocker from '../components/NewLocker';
import UserStatus from '../components/UserStatus';
import React, { useEffect, useState } from 'react';
import WalletFunds from '../components/WalletFunds';
import FactoryInfo from '../components/FactoryInfo';
import UserDetails from '../components/UserDetails';
import LockerTable from '../components/LockerTable';
import CryptoInheritor from '../components/CryptoInheritor';
import ActivateProvable from '../components/ActivateProvable';
import useWeb3Api from '../hooks/useWeb3Api';

const Home = () => {
  const setWeb3Context = useWeb3Api();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) return;
    const fetchData = async () => {
      const res = await load();
      setWeb3Context(res);
    };
    fetchData();
    setRefresh(false);
  }, [refresh, setWeb3Context]);

  return (
    <Box>
      <UserDetails />
      <CryptoInheritor />
      <FactoryInfo />
      <WalletFunds />
      <UserStatus />
      <ActivateProvable />
      <NewLocker />
      <LockerTable />
    </Box>
  );
};

export default Home;
