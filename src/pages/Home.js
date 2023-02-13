import React, { useEffect, useState } from 'react';
import { load } from '../funcs';
import CryptoInheritor from '../components/CryptoInheritor';
import NewLocker from '../components/NewLocker';
import ExistingLockers from '../components/ExistingLockers';
import WalletFunds from '../components/WalletFunds';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [addressAccount, setAddressAccount] = useState(null);
  const [cryptoInheritorContract, setCryptoInheritorContract] = useState(null);
  const [lockerFactoryContract, setlockerFactoryContract] = useState(null);
  const [lockers, setLockers] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    const fetchData = async () => {
      const {
        web3,
        addressAccount,
        lockerFactoryContract,
        cryptoInheritorContract,
        lockers,
      } = await load();
      setWeb3(web3);
      setAddressAccount(addressAccount);
      setlockerFactoryContract(lockerFactoryContract);
      setCryptoInheritorContract(cryptoInheritorContract);
      setLockers(lockers);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <CryptoInheritor
        addressAccount={addressAccount}
        cryptoInheritorContract={cryptoInheritorContract}
      />
      <WalletFunds
        web3={web3}
        addressAccount={addressAccount}
        lockerFactoryContract={lockerFactoryContract}
      />
      <NewLocker
        addressAccount={addressAccount}
        lockerFactoryContract={lockerFactoryContract}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Locker Name</TableCell>
              <TableCell>Beneficiary Address</TableCell>
              <TableCell>Locker Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lockers.map((locker) => {
              return (
                <ExistingLockers
                  web3={web3}
                  addressAccount={addressAccount}
                  lockerAddress={locker}
                  key={locker}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
