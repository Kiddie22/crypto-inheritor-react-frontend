import LockerFactory from './contracts/LockerFactory.json';
import CryptoInheritor from './contracts/CryptoInheritor.json';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');

export const load = async () => {
  const addressAccount = await loadAccount();
  const cryptoInheritorContract = await loadCryptoInheritorContract();
  const lockerFactoryContractAddress = await getLockerFactoryContractAddress(
    addressAccount,
    cryptoInheritorContract
  );
  if (
    lockerFactoryContractAddress !==
    '0x0000000000000000000000000000000000000000'
  ) {
    const lockerFactoryContract = await loadLockerFactoryContract(
      lockerFactoryContractAddress
    );
    const lockerFactoryContractBalance = await getLockerFactoryContractBalance(
      lockerFactoryContractAddress
    );
    const numberOfLockers = await fetchNumberOfLockers(
      addressAccount,
      lockerFactoryContract
    );
    const lockers = await fetchLockers(
      addressAccount,
      lockerFactoryContract,
      numberOfLockers
    );
    const username = await fetchUsername(addressAccount, lockerFactoryContract);
    const nationalId = await fetchNationalId(
      addressAccount,
      lockerFactoryContract
    );
    const oracleIsRunning = await getOracleIsRunning(
      addressAccount,
      lockerFactoryContract
    );
    const isFundsTransferred = await getFundsTransferred(
      addressAccount,
      lockerFactoryContract
    );
    return {
      web3,
      addressAccount,
      cryptoInheritorContract,
      lockerFactoryContractAddress,
      lockerFactoryContract,
      lockerFactoryContractBalance,
      numberOfLockers,
      lockers,
      username,
      nationalId,
      oracleIsRunning,
      isFundsTransferred,
    };
  }
  return {
    web3,
    addressAccount,
    cryptoInheritorContract,
    lockerFactoryContractAddress,
  };
};

const loadAccount = async () => {
  const addressAccount = await web3.eth.getCoinbase();
  return addressAccount;
};

const getLockerFactoryContractAddress = async (
  addressAccount,
  cryptoInheritorContract
) => {
  const lockerFactoryContractAddress = await cryptoInheritorContract.methods
    .getFactoryContractAddress()
    .call({ from: addressAccount });
  return lockerFactoryContractAddress;
};

export const loadLockerFactoryContract = async (
  lockerFactoryContractAddress
) => {
  const { abi } = LockerFactory;
  const lockerFactoryContract = new web3.eth.Contract(
    abi,
    lockerFactoryContractAddress
  );
  return lockerFactoryContract;
};

export const getLockerFactoryContractBalance = async (
  lockerFactoryContractAddress
) => {
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

const fetchUsername = async (addressAccount, lockerFactoryContract) => {
  const username = await lockerFactoryContract.methods
    .getUsername()
    .call({ from: addressAccount });
  return username;
};

const fetchNationalId = async (addressAccount, lockerFactoryContract) => {
  const nationalId = await lockerFactoryContract.methods
    .getNationalId()
    .call({ from: addressAccount });
  return nationalId;
};

const getOracleIsRunning = async (addressAccount, lockerFactoryContract) => {
  const isRunning = await lockerFactoryContract.methods
    .getOracleIsRunning()
    .call({ from: addressAccount });
  return isRunning;
};

const getFundsTransferred = async (addressAccount, lockerFactoryContract) => {
  const isFundsTransferred = await lockerFactoryContract.methods
    .getFundsTransferred()
    .call({ from: addressAccount });
  return isFundsTransferred;
};
