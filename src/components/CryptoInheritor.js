import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function CryptoInheritor(props) {
  const { addressAccount, cryptoInheritorContract } = props;
  const [lockerFactoryAddress, setlockerFactoryAddress] = useState('');

  useEffect(() => {
    cryptoInheritorContract && getFactoryContractAddress();
  }, [cryptoInheritorContract]);

  const getFactoryContractAddress = async () => {
    cryptoInheritorContract.methods
      .getFactoryContractAddress()
      .call({ from: addressAccount })
      .then((res) => {
        setlockerFactoryAddress(res);
      });
  };

  const createLockerFactory = async () => {
    cryptoInheritorContract.methods
      .newLockerFactory()
      .send({ from: addressAccount })
      .then((res) => {
        console.log(res.events.NewLockerFactory);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Check CryptoLocker
      </Typography>
      {lockerFactoryAddress === '0x0000000000000000000000000000000000000000' ? (
        <div>
          <button
            onClick={() => {
              createLockerFactory();
            }}
          >
            Create Account
          </button>
          <p>{lockerFactoryAddress}</p>
        </div>
      ) : (
        <div>
          Account Details
          <p>{lockerFactoryAddress}</p>
        </div>
      )}
    </div>
  );
}
