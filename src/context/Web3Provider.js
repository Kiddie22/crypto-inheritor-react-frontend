import { createContext, useEffect, useState } from 'react';
import { load } from '../funcs';
import { useNavigate } from 'react-router-dom';

export const Web3ContextData = createContext({});
export const Web3ContextApi = createContext(() => undefined);

export function Web3Provider(props) {
  const { children } = props;
  const [web3Context, setWeb3Context] = useState({});
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  window.ethereum.on('accountsChanged', async () => {
    setWeb3Context((prevValue) => ({ ...prevValue, loadingComplete: false }));
    setRefresh(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      if (refresh) {
        const res = await load();
        if (!res.addressAccount) {
          navigate('login');
        }
        const { addressAccount, web3 } = res;
        let tokens = [];
        const ethBalance = await web3.eth.getBalance(addressAccount);
        const etherValue = web3.utils.fromWei(ethBalance, 'ether');
        const newToken = { symbol: 'ETH', balance: etherValue };
        res.tokens = [...tokens, newToken];
        res.loadingComplete = true;
        setWeb3Context(res);
        setRefresh(false);
      }
    };
    fetchData();
  }, [setWeb3Context, navigate, refresh]);

  return (
    <Web3ContextData.Provider value={{ ...web3Context, setRefresh }}>
      <Web3ContextApi.Provider value={setWeb3Context}>
        {children}
      </Web3ContextApi.Provider>
    </Web3ContextData.Provider>
  );
}
