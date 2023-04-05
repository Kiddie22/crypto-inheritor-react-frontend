import UserStatus from '../components/UserStatus';
import useWeb3Data from '../hooks/useWeb3Data';

const ProfilePage = () => {
  const { lockerFactoryContract, addressAccount, nationalId } = useWeb3Data();

  const setNationalId = async () => {
    const result = await lockerFactoryContract.methods
      .setNationalId('20191118')
      .send({ from: addressAccount });
    console.log(result);
  };

  return (
    <div>
      <h1>Profile</h1>
      <UserStatus />
      <p>national id : {nationalId}</p>
      <button onClick={setNationalId}>test</button>
    </div>
  );
};

export default ProfilePage;
