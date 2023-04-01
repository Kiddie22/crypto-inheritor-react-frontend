import { useEffect, useState } from 'react';

const FactoryInfo = (props) => {
  const { web3, addressAccount, lockerFactoryContractAddress } = props.loadData;
  const [refresh, setRefresh] = useState(true);
  const [ethBalance, setEthBalance] = useState(null);

  useEffect(() => {
    if (refresh === true) {
      const getEthBalance = async () => {
        if (
          lockerFactoryContractAddress ===
          '0x0000000000000000000000000000000000000000'
        ) {
          return 0;
        }
        const balance = await web3.eth.getBalance(lockerFactoryContractAddress);
        if (balance) {
          const etherValue = web3.utils.fromWei(balance, 'ether');
          return etherValue;
        } else {
          return 0;
        }
      };

      const fetchData = async () => {
        if (lockerFactoryContractAddress) {
          const ethBalance = await getEthBalance();
          setEthBalance(ethBalance);
          setRefresh(false);
        }
      };
      fetchData();
    }
  }, [web3, refresh, lockerFactoryContractAddress]);

  const depositEth = async () => {
    const res = await web3.eth.sendTransaction({
      from: addressAccount,
      to: lockerFactoryContractAddress,
      value: web3.utils.toWei('1', 'ether'),
    });
    if (res.status === true) {
      setRefresh(true);
    }
  };

  return (
    <>
      <h4>ETH balance: {ethBalance && ethBalance}</h4>
      <button onClick={depositEth}>Add ETH to Factory contract</button>
    </>
  );
};

export default FactoryInfo;
