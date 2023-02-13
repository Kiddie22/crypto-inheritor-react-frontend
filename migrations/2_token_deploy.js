const TokenContract = artifacts.require('MemeToken');

module.exports = function (deployer) {
  deployer.deploy(TokenContract);
};
