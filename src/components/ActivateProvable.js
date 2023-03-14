import { useEffect, useState } from 'react';
import { load } from '../funcs';

const ActivateProvable = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getCounter = async () => {
      const { addressAccount, lockerFactoryContract } = await load();
      console.log(lockerFactoryContract);
      const count = await lockerFactoryContract.methods.counter().call();
      console.log({ count });
      setCounter(count);
    };
    getCounter();
  }, []);

  const activateProvable = async () => {
    const { addressAccount, lockerFactoryContract } = await load();
    console.log(lockerFactoryContract.methods);
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <div>
      <button onClick={activateProvable}>ACTIVATE</button>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default ActivateProvable;
