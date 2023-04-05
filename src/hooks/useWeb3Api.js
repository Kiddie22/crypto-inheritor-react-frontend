import { useContext } from 'react';
import { Web3ContextApi } from '../context/Web3Provider';

const useWeb3Api = () => useContext(Web3ContextApi);

export default useWeb3Api;
