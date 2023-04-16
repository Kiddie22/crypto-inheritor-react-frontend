import { useEffect } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Button } from '@mui/material';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  // const [counter, setCounter] = useState(0);
  console.log({ lockerFactoryContract });

  useEffect(() => {
    const fetchCounter = async () => {
      if ((addressAccount, lockerFactoryContract)) {
        const res = await lockerFactoryContract.methods
          .counter()
          .call({ from: addressAccount });
        console.log(res);
      }
    };
    fetchCounter();
  }, [addressAccount, lockerFactoryContract]);

  const activateProvable = async () => {
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <Button onClick={activateProvable} variant="contained">
      ACTIVATE
    </Button>
  );
};

export default ActivateProvable;
