import useWeb3Data from '../hooks/useWeb3Data';

const UserDetails = () => {
  const { addressAccount } = useWeb3Data();

  return (
    <>
      <h1>User account</h1>
      <p>{addressAccount}</p>
    </>
  );
};

export default UserDetails;
