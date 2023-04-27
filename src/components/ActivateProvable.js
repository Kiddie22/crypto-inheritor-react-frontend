import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Box, Button, Chip, Typography } from '@mui/material';
import Countdown from './Countdown';

const ActivateProvable = () => {
  const {
    addressAccount,
    lockerFactoryContract,
    oracleIsRunning,
    setRefresh,
    lockerFactoryContractBalance,
  } = useWeb3Data();
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 4,
      }}
    >
      <Typography
        variant="body1"
        mb={2}
        display={
          lockerFactoryContractBalance < 0.1 && !oracleIsRunning
            ? 'inherit'
            : 'none'
        }
      >
        A minimum of 0.1 ETH should be depoisted in the LockerFactory to
        activate the oracle
      </Typography>
      {oracleIsRunning ? (
        <Chip
          label="Oracle Active"
          color="success"
          variant="outlined"
          style={{ width: '150px', marginBottom: '2rem' }}
        />
      ) : (
        <Chip
          label="Oracle Disabled"
          color="error"
          variant="outlined"
          style={{ width: '150px', marginBottom: '2rem' }}
        />
      )}
      {!oracleIsRunning && (
        <Button
          onClick={activateProvable}
          variant="contained"
          disabled={lockerFactoryContractBalance < 0.1}
        >
          ACTIVATE
        </Button>
      )}
      {/* need a separate override button and a deactivate button */}
      <Countdown endTime={triggerTime} />
      {oracleIsRunning && (
        <Button onClick={overrideTrigger} variant="contained">
          DEACTIVATE
        </Button>
      )}
    </Box>
  );
};

export default ActivateProvable;
