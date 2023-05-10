import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // when metamask is installed
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Metamask not installed');
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Button onClick={connect} variant="outlined">
        Connect Wallet
      </Button>
    </Grid>
  );
};

export default Login;
