import { load } from '../funcs';

const ActivateProvable = () => {
  const activateProvable = async () => {
    const { addressAccount, lockerFactoryContract } = await load();
    console.log(lockerFactoryContract.methods);
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return <button onClick={activateProvable}>ACTIVATE</button>;
};

export default ActivateProvable;
