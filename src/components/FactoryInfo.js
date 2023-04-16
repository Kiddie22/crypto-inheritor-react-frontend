import { useEffect, useRef, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Box, Button, Stack, TextField } from '@mui/material';
import PendingSnackbar from './Snackbars/PendingSnackbar';
import SuccessSnackbar from './Snackbars/SuccessSnackbar';
import ErrorSnackbar from './Snackbars/ErrorSnackbar';

const FactoryInfo = () => {
  const { web3, addressAccount, lockerFactoryContractAddress } = useWeb3Data();
  const [refresh, setRefresh] = useState(true);
  const [ethBalance, setEthBalance] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const amountRef = useRef(null);

  useEffect(() => {
    if (refresh === true) {
      const getEthBalance = async () => {
        if (
          lockerFactoryContractAddress ===
          '0x0000000000000000000000000000000000000000'
        ) {
          return 0;
        }
        const balance = await web3.eth.getBalance(lockerFactoryContractAddress);
        if (balance) {
          const etherValue = web3.utils.fromWei(balance, 'ether');
          return etherValue;
        } else {
          return 0;
        }
      };

      const fetchData = async () => {
        if (lockerFactoryContractAddress) {
          const ethBalance = await getEthBalance();
          setEthBalance(ethBalance);
          setRefresh(false);
        }
      };
      fetchData();
    }
  }, [web3, refresh, lockerFactoryContractAddress]);

  const depositEth = async (e) => {
    try {
      e.preventDefault();
      setIsDisabled(true);
      setInfoOpen(true);
      const amount = amountRef.current.value;
      const res = await web3.eth.sendTransaction({
        from: addressAccount,
        to: lockerFactoryContractAddress,
        value: web3.utils.toWei(amount, 'ether'),
      });
      if (res.status === true) {
        amountRef.current.value = '';
        setIsDisabled(false);
        setRefresh(true);
        setInfoOpen(false);
        setSuccessOpen(true);
      }
    } catch (error) {
      setIsDisabled(false);
      setInfoOpen(false);
      setErrorOpen(true);
    }
  };

  return (
    <Box>
      <h4>ETH balance: {ethBalance && ethBalance}</h4>
      <form onSubmit={depositEth}>
        <Stack direction="row" spacing={1} paddingBottom={3}>
          <TextField
            id="Amount"
            label="Amount"
            variant="outlined"
            inputRef={amountRef}
            required
          />
          <Button type="submit" variant="contained" disabled={isDisabled}>
            Add ETH
          </Button>
        </Stack>
      </form>
      <PendingSnackbar infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <ErrorSnackbar errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
    </Box>
  );
};

export default FactoryInfo;
