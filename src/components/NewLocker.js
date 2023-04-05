import React, { useState } from 'react';
import useWeb3Data from '../hooks/useWeb3Data';

export default function NewLocker() {
  const { addressAccount, lockerFactoryContract } = useWeb3Data();
  const [name, setName] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const createNewLocker = async (name, beneficiary) => {
    if (lockerFactoryContract) {
      await lockerFactoryContract.methods
        .createNewLocker(name, beneficiary)
        .send({ from: addressAccount })
        .then((e) => console.log(e));
      setName('');
      setBeneficiary('');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Create New Locker</h3>
      Locker Name
      <input
        variant="outline"
        placeholder="Locker Name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      Beneficiary Address
      <input
        variant="outline"
        placeholder="Beneficiary Address"
        type="text"
        name="beneficiary"
        value={beneficiary}
        onChange={(e) => {
          setBeneficiary(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          createNewLocker(name, beneficiary);
        }}
      >
        Create New Locker
      </button>
    </div>
  );
}
