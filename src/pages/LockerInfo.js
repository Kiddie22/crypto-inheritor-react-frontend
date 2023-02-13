import { load } from '../funcs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Locker from '../contracts/Locker.json';

const LockerInfo = () => {
  const { lockerAddress } = useParams();
  const [web3, setWeb3] = useState(null);
  const [addressAccount, setAddressAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { web3, addressAccount } = await load();
      // const lockerContract = await loadLockerContract();
      setWeb3(web3);
      setAddressAccount(addressAccount);
      getEthBalance();
    };
    fetchData();
  }, [lockerAddress, ethBalance]);

  const getEthBalance = async () => {
    const balance = await web3.eth.getBalance(lockerAddress);
    if (balance) {
      const etherValue = web3.utils.fromWei(balance, 'ether');
      setEthBalance(etherValue);
    }
  };

  // const loadLockerContract = async () => {
  //   if (lockerAddress) {
  //     var { abi } = Locker;
  //     const address = lockerAddress;
  //     const contract = await new web3.eth.Contract(abi, address);
  //     return contract;
  //   }
  // };

  return (
    <>
      <h4>{`Locker Info ${lockerAddress}`}</h4>
      <h4>ETH balance: {(ethBalance && ethBalance) || 0}</h4>
    </>
  );
};

export default LockerInfo;
