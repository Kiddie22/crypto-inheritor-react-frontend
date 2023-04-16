import { createContext, useEffect, useState } from 'react';
import { load } from '../funcs';
import { useNavigate } from 'react-router-dom';
import MemeToken from '../contracts/MemeToken.json';

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
        tokens = [...tokens, newToken];

        // const token = new web3.eth.Contract(
        //   MemeToken.abi,
        //   '0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5'
        // );
        // const [symbol, decimals] = await Promise.all([
        //   token.methods.symbol().call({ from: addressAccount }),
        //   token.methods.decimals().call({ from: addressAccount }),
        // ]);

        // let usdtBalance = await token.methods.balanceOf(addressAccount).call();
        // usdtBalance = String(usdtBalance / Math.pow(10, decimals));
        // tokens = [...tokens, { symbol, balance: usdtBalance }];

        res.tokens = tokens;
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
