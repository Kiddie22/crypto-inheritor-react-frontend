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

const LockerTable = (props) => {
  const { web3, lockers, addressAccount } = props.loadData;
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
              return (
                <ExistingLockers
                  web3={web3}
                  addressAccount={addressAccount}
                  lockerAddress={locker}
                  key={locker}
                />
              );
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
