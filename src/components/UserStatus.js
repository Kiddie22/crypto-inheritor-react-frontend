import { useEffect, useState } from 'react';
import { load } from '../funcs';

const UserStatus = () => {
  const [isAlive, setIsAlive] = useState(null);

  useEffect(() => {
    getUserStatus();
  }, []);

  const getUserStatus = async () => {
    const { lockerFactoryContract } = await load();
    const isAlive = await lockerFactoryContract.methods.isAlive().call();
    setIsAlive(isAlive);
  };

  return (
    <div>
      <h5>User is alive? {isAlive ? <span>true</span> : <span>false</span>}</h5>
    </div>
  );
};

export default UserStatus;
