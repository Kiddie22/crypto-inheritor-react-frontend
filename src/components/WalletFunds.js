import React, { useEffect, useState } from 'react';
import MemeToken from '../contracts/MemeToken.json';

const ExistingLockers = (props) => {
  const { web3, addressAccount } = props.loadData;
  const [ethBalance, setEthBalance] = useState(0);
  const [balanceAddress, setBalanceAddress] = useState('');
  const [token, setToken] = useState({});

  const onInputchange = (event) => {
    setBalanceAddress(event.target.value);
  };

  const checkAddressBalance = (balanceAddress) => {
    getTokenAmount(balanceAddress);
  };

  useEffect(() => {
    const getEthBalance = async () => {
      if (addressAccount) {
        const balance = await web3.eth.getBalance(addressAccount);
        const etherValue = web3.utils.fromWei(balance, 'ether');
        setEthBalance(etherValue);
      }
    };

    getEthBalance();
  }, [web3, addressAccount]);

  const getTokenAmount = async (tokenAddress) => {
    // create contract instance
    const token = new web3.eth.Contract(MemeToken.abi, tokenAddress);

    // check if token has name symbol and decimals
    let _name, _symbol, _decimals;
    try {
      [_name, _symbol, _decimals] = await Promise.all([
        token.methods.name().call({ from: addressAccount }),
        token.methods.symbol().call({ from: addressAccount }),
        token.methods.decimals().call({ from: addressAccount }),
      ]);
      console.log(_name, _symbol, _decimals);
    } catch (err) {
      console.log(err);
    }

    // now get the balance of current account
    const _balance = await token.methods.balanceOf(tokenAddress).call();
    setToken({ _name, _symbol, _balance });
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Wallet Funds</h3>
      <table variant="simple">
        <thead>
          <tr>
            <th>Token</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ETH</td>
            <td>{ethBalance}</td>
          </tr>
          {token ? (
            <tr>
              <td>{token._name}</td>
              <td>{token._balance}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      Address
      <input
        variant="filled"
        placeholder="Address"
        type="text"
        name="balanceAddress"
        value={balanceAddress}
        onChange={onInputchange}
      />
      <br />
      <button
        onClick={() => {
          checkAddressBalance(balanceAddress);
        }}
      >
        Check Balance
      </button>
    </div>
  );
};

export default ExistingLockers;
