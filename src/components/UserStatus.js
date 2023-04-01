import { useEffect, useState } from 'react';

const UserStatus = (props) => {
  const { lockerFactoryContract } = props.loadData;
  const [isAlive, setIsAlive] = useState(null);

  useEffect(() => {
    const getUserStatus = async () => {
      const isAlive = await lockerFactoryContract.methods.isAlive().call();
      setIsAlive(isAlive);
    };

    lockerFactoryContract && getUserStatus();
  }, [lockerFactoryContract]);

  return (
    <div>
      <h5>User is alive? {isAlive ? <span>true</span> : <span>false</span>}</h5>
    </div>
  );
};

export default UserStatus;
