import React, { useEffect, useState } from 'react';
import Locker from '../contracts/Locker.json';
import { TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ExistingLockers(props) {
  const { web3, lockerAddress } = props;
  const [lockerName, setLockerName] = useState('');
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('');

  useEffect(() => {
    const loadLockerContract = async () => {
      if (lockerAddress) {
        var { abi } = Locker;
        const address = lockerAddress;
        const contract = await new web3.eth.Contract(abi, address);
        return contract;
      }
    };

    const getLockerName = async (lockerContract) => {
      lockerContract.options.address = lockerAddress;
      await lockerContract.methods
        .name()
        .call()
        .then((res) => {
          setLockerName(res);
        });
    };

    const getLockerBeneficiaryAddress = async (lockerContract) => {
      lockerContract.options.address = lockerAddress;
      await lockerContract.methods
        .beneficiary()
        .call()
        .then((res) => {
          setBeneficiaryAddress(res);
        });
    };

    const loadLockers = async () => {
      const lockerContract = await loadLockerContract();
      if (lockerContract && lockerAddress) {
        getLockerName(lockerContract);
        getLockerBeneficiaryAddress(lockerContract);
      }
    };
    loadLockers();
  }, [web3, lockerAddress]);

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
