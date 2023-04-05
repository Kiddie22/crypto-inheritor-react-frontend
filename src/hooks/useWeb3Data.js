import { useContext } from 'react';
import { Web3ContextData } from '../context/Web3Provider';

const useWeb3Data = () => useContext(Web3ContextData);

export default useWeb3Data;
