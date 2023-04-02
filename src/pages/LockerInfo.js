import { load } from '../funcs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Locker from '../contracts/Locker.json';

const LockerInfo = () => {
  const { lockerAddress } = useParams();
  const [web3, setWeb3] = useState(null);
  const [addressAccount, setAddressAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const amountRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { web3, addressAccount } = await load();
      setWeb3(web3);
      setAddressAccount(addressAccount);
      const ethBalance = await getEthBalance(web3, lockerAddress);
      setEthBalance(ethBalance);
      // const lockerContract = await loadLockerContract(
      //   web3,
      //   Locker,
      //   lockerAddress
      // );
    };
    fetchData();
  });

  const getEthBalance = async (web3, lockerAddress) => {
    const balance = await web3.eth.getBalance(lockerAddress);
    if (balance) {
      const etherValue = web3.utils.fromWei(balance, 'ether');
      return etherValue;
    } else {
      return 0;
    }
  };

  const loadLockerContract = async (web3, Locker, lockerAddress) => {
    if (lockerAddress) {
      var { abi } = Locker;
      const address = lockerAddress;
      const contract = await new web3.eth.Contract(abi, address);
      return contract;
    }
  };

  const depositEth = async (e) => {
    e.preventDefault();
    const amount = amountRef.current.value;
    await web3.eth.sendTransaction({
      from: addressAccount,
      to: lockerAddress,
      value: web3.utils.toWei(amount, 'ether'),
    });
  };

  const withdrawEth = async () => {
    const lockerContract = await loadLockerContract(
      web3,
      Locker,
      lockerAddress
    );
    lockerContract.methods
      .withdraw(web3.utils.toWei('1', 'ether'))
      .send({ from: addressAccount });
  };

  return (
    <>
      <h4>{`Locker Info ${lockerAddress}`}</h4>
      <h4>ETH balance: {ethBalance && ethBalance}</h4>
      <form onSubmit={depositEth}>
        <label htmlFor="amount">Amount</label>
        <input type="text" name="amount" id="amount" ref={amountRef} />
        <button type="submit">Add ETH to Locker</button>
      </form>
      <button onClick={withdrawEth}>Withdraw ETH</button>
    </>
  );
};

export default LockerInfo;
