import { load } from '../funcs';
import { useEffect, useState } from 'react';

const FactoryInfo = () => {
  const [ethBalance, setEthBalance] = useState(null);
  const [lockerFactoryAddress, setlockerFactoryAddress] = useState(null);

  useEffect(() => {
    const getFactoryContractAddress = async () => {
      const { cryptoInheritorContract, addressAccount } = await load();
      cryptoInheritorContract.methods
        .getFactoryContractAddress()
        .call({ from: addressAccount })
        .then((res) => {
          setlockerFactoryAddress(res);
        });
    };

    const fetchData = async () => {
      if (lockerFactoryAddress) {
        const ethBalance = await getEthBalance();
        setEthBalance(ethBalance);
      }
    };

    getFactoryContractAddress();
    fetchData();
  }, [lockerFactoryAddress]);

  const getEthBalance = async () => {
    const { web3 } = await load();
    const balance = await web3.eth.getBalance(lockerFactoryAddress);
    if (balance) {
      const etherValue = web3.utils.fromWei(balance, 'ether');
      return etherValue;
    } else {
      return 0;
    }
  };

  const depositEth = async () => {
    const { web3, addressAccount } = await load();
    await web3.eth.sendTransaction({
      from: addressAccount,
      to: lockerFactoryAddress,
      value: web3.utils.toWei('1', 'ether'),
    });
  };

  return (
    <>
      <h4>ETH balance: {ethBalance && ethBalance}</h4>
      <button onClick={depositEth}>Add ETH to Factory contract</button>
    </>
  );
};

export default FactoryInfo;
