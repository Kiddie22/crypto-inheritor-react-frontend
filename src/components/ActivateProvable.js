import { useEffect, useState } from 'react';

const ActivateProvable = (props) => {
  const { addressAccount, lockerFactoryContract } = props.loadData;
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
      <p>Counter: {counter}</p>
    </div>
  );
};

export default ActivateProvable;
