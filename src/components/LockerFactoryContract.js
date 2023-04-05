import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';
import FactoryInfo from './FactoryInfo';

export default function LockerFactoryContract() {
  const {
    addressAccount,
    cryptoInheritorContract,
    lockerFactoryContractAddress,
  } = useWeb3Data();

  const createLockerFactory = async () => {
    cryptoInheritorContract.methods
      .newLockerFactory()
      .send({ from: addressAccount })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        LockerFactory Contract
      </Typography>
      {lockerFactoryContractAddress ===
      '0x0000000000000000000000000000000000000000' ? (
        <div>
          <p>No Locker factory contract exists for this wallet</p>
          <Button
            onClick={() => {
              createLockerFactory();
            }}
            variant="contained"
          >
            Create Contract
          </Button>
        </div>
      ) : (
        <div>
          Contract Address
          <p>{lockerFactoryContractAddress}</p>
          <FactoryInfo />
        </div>
      )}
    </Box>
  );
}
