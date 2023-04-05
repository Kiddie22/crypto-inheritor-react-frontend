import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Divider } from '@mui/material';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  const [counter, setCounter] = useState(0);
  const [oracleIsRunning, setOracleIsRunning] = useState(false);

  useEffect(() => {
    if (lockerFactoryContract) {
      const getCounter = async () => {
        const count = await lockerFactoryContract.methods.counter().call();
        setCounter(count);
      };

      const getOracleIsRunning = async () => {
        const isRunning = await lockerFactoryContract.methods
          .oracleIsRunning()
          .call();
        setOracleIsRunning(isRunning);
      };

      getCounter();
      getOracleIsRunning();
    }
  }, [lockerFactoryContract]);

  const activateProvable = async () => {
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <div>
      <Divider />
      <button onClick={activateProvable}>ACTIVATE</button>
      <h5>Provable is {oracleIsRunning ? 'running' : 'not running'}</h5>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default ActivateProvable;
