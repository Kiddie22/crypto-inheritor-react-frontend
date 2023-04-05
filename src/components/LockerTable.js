import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ExistingLockers from './ExistingLockers';
import useWeb3Data from '../hooks/useWeb3Data';

const LockerTable = () => {
  const { lockers } = useWeb3Data();
  return (
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
  );
};

export default LockerTable;
