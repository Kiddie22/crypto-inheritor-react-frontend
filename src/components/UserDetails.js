import { Box, Chip } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';

const UserDetails = () => {
  const { addressAccount } = useWeb3Data();

  return (
    <Box>
      Connected with <Chip label={addressAccount} />
    </Box>
  );
};

export default UserDetails;
