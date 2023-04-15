import { Grid } from '@mui/material';
import LockerTable from '../components/LockerTable';
import NewLocker from '../components/NewLocker';

const Lockers = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <NewLocker />
      <LockerTable />
    </Grid>
  );
};

export default Lockers;
