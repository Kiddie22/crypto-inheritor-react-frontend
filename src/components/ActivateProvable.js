import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Box, Button, Chip, Typography } from '@mui/material';
import Countdown from './Countdown';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract, oracleIsRunning, setRefresh } =
    useWeb3Data();
  const [triggerTime, setTriggerTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTriggerTime = async () => {
      if ((addressAccount, lockerFactoryContract)) {
        const res = await lockerFactoryContract.methods
          .triggerTime()
          .call({ from: addressAccount });
        setTriggerTime(res);
      }
    };
    // fetchCounter();
    fetchTriggerTime();
  }, [addressAccount, lockerFactoryContract]);

  const activateProvable = async () => {
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  const overrideTrigger = async () => {
    const res = await lockerFactoryContract.methods
      .manualOverride()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body1" mb={2}>
        It is recommended to keep a minimum of 0.1 ETH in your LockerFactory
        contract to ensure the Provable oracle can function properly
      </Typography>
      {oracleIsRunning ? (
        <Chip
          label="Oracle Active"
          color="success"
          style={{ width: '200px', marginBottom: '2rem'  }}
        />
      ) : (
        <Chip
          label="Oracle Disabled"
          color="error"
          style={{ width: '200px', marginBottom: '2rem' }}
        />
      )}
      {triggerTime === '0' && (
        <Button onClick={activateProvable} variant="contained">
          ACTIVATE
        </Button>
      )}
      <Countdown endTime={triggerTime} />
      {triggerTime !== '0' && (
        <Button onClick={overrideTrigger} variant="contained">
          DEACTIVATE
        </Button>
      )}
    </Box>
  );
};

export default ActivateProvable;
