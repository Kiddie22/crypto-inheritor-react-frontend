import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ExistingLockers from './ExistingLockers';
import useWeb3Data from '../hooks/useWeb3Data';

const LockerTable = () => {
  const { lockers } = useWeb3Data();
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Locker Table
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Locker Name</TableCell>
              <TableCell>Beneficiary Address</TableCell>
              <TableCell>Locker Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lockers && lockers[0] !== '0' ? (
              lockers.map((locker) => {
                return <ExistingLockers lockerAddress={locker} key={locker} />;
              })
            ) : (
              <TableRow>
                <TableCell>Nothing to display!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LockerTable;
