import LockerFactory from './contracts/LockerFactory.json';
import CryptoInheritor from './contracts/CryptoInheritor.json';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

export const load = async () => {
  const addressAccount = await loadAccount();
  const cryptoInheritorContract = await loadCryptoInheritorContract();
  const lockerFactoryContract = await loadLockerFactoryContract();
  const numberOfLockers = await fetchNumberOfLockers(
    addressAccount,
    lockerFactoryContract
  );
  const lockers = await fetchLockers(
    addressAccount,
    lockerFactoryContract,
    numberOfLockers
  );
  return {
    web3,
    addressAccount,
    lockerFactoryContract,
    cryptoInheritorContract,
    numberOfLockers,
    lockers,
  };
};

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};

const loadLockerFactoryContract = async () => {
  var { abi } = LockerFactory;
  const networkID = await web3.eth.net.getId();
  const address = LockerFactory.networks[networkID].address;
  const lockerFactoryContract = new web3.eth.Contract(abi, address);
  return lockerFactoryContract;
};

const loadCryptoInheritorContract = async () => {
  var { abi } = CryptoInheritor;
  const networkID = await web3.eth.net.getId();
  const address = CryptoInheritor.networks[networkID].address;
  const cryptoInheritorContract = new web3.eth.Contract(abi, address);
  return cryptoInheritorContract;
};

const fetchNumberOfLockers = async (addressAccount, lockerFactoryContract) => {
  const number = await lockerFactoryContract.methods
    .getNumberOfLockers()
    .call({ from: addressAccount });
  return number;
};

const fetchLockers = async (
  addressAccount,
  lockerFactoryContract,
  numberOfLockers
) => {
  let lockerArray = [numberOfLockers];
  for (let i = 0; i < numberOfLockers; i++) {
    let locker = await lockerFactoryContract.methods
      .getLockerByIndex(i)
      .call({ from: addressAccount });
    lockerArray[i] = locker;
  }
  return lockerArray;
};
