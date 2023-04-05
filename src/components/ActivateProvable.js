import useWeb3Data from '../hooks/useWeb3Data';
import { Button, Chip } from '@mui/material';

const ActivateProvable = () => {
  const { addressAccount, lockerFactoryContract, oracleIsRunning } =
    useWeb3Data();
  // const [counter, setCounter] = useState(0);

  const activateProvable = async () => {
    const res = await lockerFactoryContract.methods
      .getUser()
      .send({ from: addressAccount });
    console.log(res);
  };

  return (
    <>
      <Button onClick={activateProvable} variant="contained">
        ACTIVATE
      </Button>
      {oracleIsRunning ? (
        <Chip label="Oracle Active" color="success" />
      ) : (
        <Chip label="Oracle Disabled" color="error" />
      )}
      {/* <p>Counter: {counter}</p> */}
    </>
  );
};

export default ActivateProvable;
