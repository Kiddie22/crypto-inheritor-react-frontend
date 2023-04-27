import {
  Box,
  Grid,
  Card,
  CardMedia,
  Container,
  Typography,
  Skeleton,
} from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';

const WalletFundsCard = () => {
  const { ethBalance } = useWeb3Data();

  return (
    <Container maxWidth="md">
      <Typography variant="h6" mb={2}>
        Wallet Funds
      </Typography>
      <Box>
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

          {/* ----------------------------- SKELETON CARD ----------------------------- */}
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Skeleton
                    variant="circular"
                    width={120}
                    height={120}
                    style={{ margin: '20px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box p={2}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* ----------------------------- SKELETON CARD ----------------------------- */}
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Skeleton
                    variant="circular"
                    width={120}
                    height={120}
                    style={{ margin: '20px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Box p={2}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
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
