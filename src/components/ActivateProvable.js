import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getCounter = async () => {
      const count = await lockerFactoryContract.methods.counter().call();
      setCounter(count);
    };
    lockerFactoryContract && getCounter();
  }, [lockerFactoryContract]);

  const activateProvable = async () => {
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <div>
      <button onClick={activateProvable}>ACTIVATE</button>
      <h5>Provable is running</h5>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default ActivateProvable;
