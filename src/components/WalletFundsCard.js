import {
  Box,
  Grid,
  Card,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';

const WalletFundsCard = () => {
  const { ethBalance } = useWeb3Data();

  return (
    <Container maxWidth="md">
      <Typography variant="h6" mb={2}>
        Wallet Funds
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* ----------------------------- ETH CARD ----------------------------- */}
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="eth.png"
                    alt="Ethereum Logo"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box p={2}>
                    <Typography variant="h5" gutterBottom>
                      Ethereum
                    </Typography>
                    <Typography variant="h6">
                      {(Math.round(ethBalance * 100) / 100).toFixed(2)} ETH
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* ----------------------------- USDC CARD ----------------------------- */}
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="usdc.svg"
                    alt="USDC Logo"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box p={2}>
                    <Typography variant="h5" gutterBottom>
                      USDC
                    </Typography>
                    <Typography variant="h6">
                      {(Math.round(ethBalance * 100) / 100).toFixed(2)} USDC
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WalletFundsCard;
