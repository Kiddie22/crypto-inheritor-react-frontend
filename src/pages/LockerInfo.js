import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Locker from '../contracts/Locker.json';
import useWeb3Data from '../hooks/useWeb3Data';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

const LockerInfo = () => {
  const { lockerAddress } = useParams();
  const { web3, addressAccount } = useWeb3Data();
  const [ethBalance, setEthBalance] = useState(null);
  const amountRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const ethBalance = await getEthBalance(web3, lockerAddress);
      setEthBalance(ethBalance);
    };
    fetchData();
  });

  const getEthBalance = async (web3, lockerAddress) => {
    const balance = await web3.eth.getBalance(lockerAddress);
    if (balance) {
      const etherValue = web3.utils.fromWei(balance, 'ether');
      return etherValue;
    } else {
      return 0;
    }
  };

  const loadLockerContract = async (web3, Locker, lockerAddress) => {
    if (lockerAddress) {
      var { abi } = Locker;
      const address = lockerAddress;
      const contract = await new web3.eth.Contract(abi, address);
      return contract;
    }
  };

  const depositEth = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    await web3.eth.sendTransaction({
      from: addressAccount,
      to: lockerAddress,
      value: web3.utils.toWei(amount, 'ether'),
    });
  };

  const withdrawEth = async () => {
    const lockerContract = await loadLockerContract(
      web3,
      Locker,
      lockerAddress
    );
    lockerContract.methods
      .withdraw(web3.utils.toWei('1', 'ether'))
      .send({ from: addressAccount });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Typography variant="h3">Locker</Typography>
      <Typography variant="h6">{lockerAddress}</Typography>
      <h4>ETH balance: {ethBalance && ethBalance}</h4>
      <form onSubmit={depositEth}>
        <Stack direction="row" spacing={1} paddingBottom={3}>
          <TextField placeholder="Amount" ref={amountRef} size="small" />
          <Button type="submit" variant="contained" size="small">
            Add ETH to Locker
          </Button>
        </Stack>
      </form>
      <Button
        type="submit"
        variant="contained"
        size="small"
        onClick={withdrawEth}
      >
        Withdraw ETH
      </Button>
    </Grid>
  );
};

export default LockerInfo;
