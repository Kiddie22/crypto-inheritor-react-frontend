import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Chip, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import useWeb3Data from '../../hooks/useWeb3Data';
import ConnectedWalletChip from '../ConnectedWalletChip';

const Header = () => {
  const { lockerFactoryContract, oracleIsRunning } = useWeb3Data();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">
                <Link
                  to="/"
                  style={{ textDecoration: 'inherit', color: 'inherit' }}
                >
                  Crypto Inheritor
                </Link>
              </Typography>
            </Grid>

            {lockerFactoryContract ? (
              <>
                <Grid item>
                  <Link
                    to="/"
                    style={{
                      textDecoration: 'inherit',
                      color: 'inherit',
                      paddingRight: '10px',
                    }}
                  >
                    Home
                  </Link>

                  <Link
                    to="/lockers"
                    style={{
                      textDecoration: 'inherit',
                      color: 'inherit',
                      paddingRight: '10px',
                    }}
                  >
                    Lockers
                  </Link>

                  <Link
                    to="/wallet"
                    style={{
                      textDecoration: 'inherit',
                      color: 'inherit',
                      paddingRight: '10px',
                    }}
                  >
                    Wallet
                  </Link>

                  <Link
                    to="/profile"
                    style={{
                      textDecoration: 'inherit',
                      color: 'inherit',
                      paddingRight: '10px',
                    }}
                  >
                    Profile
                  </Link>
                </Grid>

                <Grid item>
                  <Stack direction="row">
                    {oracleIsRunning ? (
                      <Chip label="Oracle Active" color="success" />
                    ) : (
                      <Chip label="Oracle Disabled" color="error" />
                    )}

                    <ConnectedWalletChip />
                  </Stack>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
