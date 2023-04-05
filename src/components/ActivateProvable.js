import useWeb3Data from '../hooks/useWeb3Data';
import { Button, Chip, Grid } from '@mui/material';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  // const [counter, setCounter] = useState(0);

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
