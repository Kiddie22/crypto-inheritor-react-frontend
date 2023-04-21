import React, { useState } from 'react';
import MemeToken from '../contracts/MemeToken.json';
import useWeb3Data from '../hooks/useWeb3Data';
import useWeb3Api from '../hooks/useWeb3Api';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const WalletFunds = () => {
  const { web3, addressAccount, tokens } = useWeb3Data();
  const setWeb3Context = useWeb3Api();
  const [balanceAddress, setBalanceAddress] = useState('');

  const onInputchange = (event) => {
    setBalanceAddress(event.target.value);
  };

  const checkAddressBalance = async (tokenAddress) => {
    if (addressAccount) {
      const token = new web3.eth.Contract(MemeToken.abi, tokenAddress);
      const [symbol, decimals] = await Promise.all([
        token.methods.symbol().call({ from: addressAccount }),
        token.methods.decimals().call({ from: addressAccount }),
      ]);
      let balance = await token.methods.balanceOf(addressAccount).call();
      balance = String(balance / Math.pow(10, decimals));
      const newTokens = [...tokens, { symbol, balance }];
      setWeb3Context((value) => {
        return { ...value, tokens: newTokens };
      });
    }
  };

  return (
    <>
      <h3>Wallet Funds</h3>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Token</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens?.map((token) => (
              <TableRow key={token.symbol}>
                <TableCell align="left">{token.symbol}</TableCell>
                <TableCell align="right">{token.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" spacing={1} paddingTop={3}>
        <TextField
          placeholder="Address"
          value={balanceAddress}
          onChange={onInputchange}
        />
        <Button
          variant="contained"
          onClick={() => {
            checkAddressBalance(balanceAddress);
          }}
        >
          Check Balance
        </Button>
      </Stack>
    </>
  );
};

export default WalletFunds;
