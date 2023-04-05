import { useEffect, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';

const UserStatus = () => {
  const { addressAccount, lockerFactoryContract } = useWeb3Data;
  const [isAlive, setIsAlive] = useState(null);

  useEffect(() => {
    const getUserStatus = async () => {
      const isAlive = await lockerFactoryContract.methods
        .getIsAlive()
        .call({ from: addressAccount });
      setIsAlive(isAlive);
    };

    lockerFactoryContract && getUserStatus();
  }, [addressAccount, lockerFactoryContract]);

  return (
    <div>
      <h5>User is alive? {isAlive ? <span>true</span> : <span>false</span>}</h5>
    </div>
  );
};

export default UserStatus;
