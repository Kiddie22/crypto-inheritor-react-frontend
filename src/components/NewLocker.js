import React, { useRef, useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';
import { Box, Button, TextField, Typography } from '@mui/material';
import PendingSnackbar from './Snackbars/PendingSnackbar';
import SuccessSnackbar from './Snackbars/SuccessSnackbar';
import ErrorSnackbar from './Snackbars/ErrorSnackbar';

export default function NewLocker() {
  const { addressAccount, lockerFactoryContract, setRefresh } = useWeb3Data();
  const lockerNameRef = useRef(null);
  const benefAddressRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const createNewLocker = async (e) => {
    e.preventDefault();
    const name = lockerNameRef.current.value;
    const beneficiary = benefAddressRef.current.value;
    if (lockerFactoryContract) {
      setIsDisabled(true);
      setInfoOpen(true);
      try {
        await lockerFactoryContract.methods
          .createNewLocker(name, beneficiary)
          .send({ from: addressAccount });
        setIsDisabled(false);
        setInfoOpen(false);
        setSuccessOpen(true);
      } catch (error) {
        console.log(error);
        setIsDisabled(false);
        setInfoOpen(false);
        setErrorOpen(true);
      }
      lockerNameRef.current.value = '';
      benefAddressRef.current.value = '';
      setRefresh(true);
    } else {
      console.log('Locker factory contract not found');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Create new Locker
      </Typography>
      <form onSubmit={createNewLocker}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Locker Name"
            variant="outlined"
            size="small"
            inputRef={lockerNameRef}
            required
          />
          <TextField
            label="Beneficiary Address"
            variant="outlined"
            size="small"
            inputRef={benefAddressRef}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={isDisabled}
          >
            Create New Locker
          </Button>
        </Box>
      </form>
      <PendingSnackbar infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
      <ErrorSnackbar errorOpen={errorOpen} setErrorOpen={setErrorOpen} />
    </Box>
  );
}
