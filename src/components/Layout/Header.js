import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Chip, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import useWeb3Data from '../../hooks/useWeb3Data';
import ConnectedWalletChip from '../ConnectedWalletChip';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: '1rem',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const Header = () => {
  const { lockerFactoryContract, oracleIsRunning } = useWeb3Data();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <StyledToolbar>
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
          </Grid>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
