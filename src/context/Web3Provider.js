import { createContext, useEffect, useState } from 'react';
import { load } from '../funcs';

export const Web3ContextData = createContext({});
export const Web3ContextApi = createContext(() => undefined);

export function Web3Provider(props) {
  const { children } = props;
  const [web3Context, setWeb3Context] = useState({});
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (!refresh) return;
    const fetchData = async () => {
      const res = await load();
      setWeb3Context(res);
    };
    fetchData();
    setRefresh(false);
  }, [refresh, setWeb3Context]);

  return (
    <Web3ContextData.Provider value={web3Context}>
      <Web3ContextApi.Provider value={setWeb3Context}>
        {children}
      </Web3ContextApi.Provider>
    </Web3ContextData.Provider>
  );
}
