const UserDetails = (props) => {
  const { addressAccount } = props.loadData;

  return (
    <>
      <h1>User account</h1>
      <p>{addressAccount}</p>
    </>
  );
};

export default UserDetails;
