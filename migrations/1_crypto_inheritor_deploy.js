const AdminContract = artifacts.require('AdminContract');
const CryptoInheritor = artifacts.require('CryptoInheritor');

module.exports = function (deployer) {
  deployer.deploy(CryptoInheritor);
};

module.exports = async function (deployer) {
  await deployer.deploy(AdminContract);
  const AdminContractInstance = await AdminContract.deployed();
  await deployer.deploy(CryptoInheritor, AdminContractInstance.address);
};
