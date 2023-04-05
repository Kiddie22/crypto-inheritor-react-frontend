import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{ textDecoration: 'inherit', color: 'inherit' }}
            >
              Crypto Inheritor
            </Link>
          </Typography>
          <Link
            to="/wallet"
            style={{
              textDecoration: 'inherit',
              color: 'inherit',
              padding: '10px',
            }}
          >
            <AccountBalanceWalletIcon />
          </Link>

          <Link to="/profile">
            <Avatar />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
