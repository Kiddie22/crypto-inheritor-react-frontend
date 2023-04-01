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

const Home = () => {
  const [loadData, setLoadData] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) return;

    const fetchData = async () => {
      const res = await load();
      setLoadData(res);

      res.cryptoInheritorContract.methods
        .getFactoryContractAddress()
        .call({ from: res.addressAccount })
        .then((_res) => {
          setLoadData({ ...res, lockerFactoryContractAddress: _res });
        });
    };

    fetchData();
    setRefresh(false);
  }, [refresh, loadData]);

  return (
    <Box>
      <UserDetails loadData={loadData} />
      <CryptoInheritor loadData={loadData} />
      <FactoryInfo loadData={loadData} />
      <WalletFunds loadData={loadData} />
      <UserStatus loadData={loadData} />
      <ActivateProvable loadData={loadData} />
      <NewLocker loadData={loadData} />
      <LockerTable loadData={loadData} />
    </Box>
  );
};

export default Home;
