import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function CryptoInheritor(props) {
  const {
    addressAccount,
    cryptoInheritorContract,
    lockerFactoryContractAddress,
  } = props.loadData;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(false);
  }, [refresh]);

  const createLockerFactory = async () => {
    cryptoInheritorContract.methods
      .newLockerFactory()
      .send({ from: addressAccount })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => console.log(e));
    setRefresh(true);
  };

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h6" gutterBottom>
        Check CryptoLocker
      </Typography>
      {lockerFactoryContractAddress ===
      '0x0000000000000000000000000000000000000000' ? (
        <div>
          <button
            onClick={() => {
              createLockerFactory();
            }}
          >
            Create Account
          </button>
        </div>
      ) : (
        <div>
          Account Details
          <p>{lockerFactoryContractAddress}</p>
        </div>
      )}
    </div>
  );
}
