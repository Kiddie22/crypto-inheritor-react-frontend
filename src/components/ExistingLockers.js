import React, { useEffect, useState } from 'react';
import Locker from '../contracts/Locker.json';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import useWeb3Data from '../hooks/useWeb3Data';

export default function ExistingLockers(props) {
  const { lockerAddress } = props;
  const { web3, addressAccount } = useWeb3Data();
  const [lockerName, setLockerName] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');

  useEffect(() => {
    const loadLockerContract = async () => {
      var { abi } = Locker;
      const contract = await new web3.eth.Contract(abi, lockerAddress);
      return contract;
    };

    const getLockerName = async (lockerContract) => {
      await lockerContract.methods
        .name()
        .call()
        .then((res) => {
          setLockerName(res);
        });
    };

    const getLockerBeneficiaryAddress = async (lockerContract) => {
      await lockerContract.methods
        .getBeneficiaryAddress()
        .call({ from: addressAccount })
        .then((res) => {
          setBeneficiaryAddress(res);
        });
    };

    const loadLockerDetails = async () => {
      const lockerContract = await loadLockerContract();
      if (lockerContract) {
        getLockerName(lockerContract);
        getLockerBeneficiaryAddress(lockerContract);
      }
    };

    loadLockerDetails();
  }, [web3, lockerAddress, addressAccount]);

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>
          {lockerAddress && (
            <Link to={`locker/${lockerAddress}`}>{lockerName}</Link>
          )}
        </TableCell>
        <TableCell>{beneficiaryAddress && beneficiaryAddress}</TableCell>
        <TableCell>{lockerAddress && lockerAddress}</TableCell>
      </TableRow>
    </>
  );
}
