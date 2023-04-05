import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

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
              Home
            </Link>
          </Typography>
          <Link to="/profile" style={{ textDecoration: 'inherit', color: 'inherit' }}>
            <Avatar />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
