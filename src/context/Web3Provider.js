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
    setRefresh(true);
  });

  useEffect(() => {
    const fetchData = async () => {
      if (refresh) {
        const res = await load();
        setWeb3Context(res);
        if (!res.addressAccount) {
          navigate('login');
        }
        setRefresh(false);
      }
    };
    fetchData();
  }, [setWeb3Context, navigate, refresh]);

  return (
    <Web3ContextData.Provider value={web3Context}>
      <Web3ContextApi.Provider value={setWeb3Context}>
        {children}
      </Web3ContextApi.Provider>
    </Web3ContextData.Provider>
  );
}
