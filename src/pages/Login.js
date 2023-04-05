import { Button } from '@mui/material';
import Web3 from 'web3';

const Login = () => {
  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // when metamask is installed
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log(accounts);
        const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        console.log(web3);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Metamask not installed');
    }
  };

  return <Button onClick={connect}>Connect Wallet</Button>;
};

export default Login;
