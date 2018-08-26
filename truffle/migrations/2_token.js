var MeuToken = artifacts.require("./MeuToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MeuToken, 10);
};
