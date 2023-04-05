import { Box, Chip } from '@mui/material';
import useWeb3Data from '../hooks/useWeb3Data';

const ConnectedWalletChip = () => {
  const { addressAccount } = useWeb3Data();
  return (
    <Box>
      {addressAccount && (
        <Chip
          label={`Connected: ${addressAccount.substring(
            0,
            6
          )}...${addressAccount.substring(38)}`}
        />
      )}
    </Box>
  );
};

export default ConnectedWalletChip;
