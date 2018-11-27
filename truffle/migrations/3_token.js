var TokenERC20 = artifacts.require("./token/StandardTokenERC20.sol");

module.exports = function(deployer) {
  deployer.deploy(TokenERC20);
};
