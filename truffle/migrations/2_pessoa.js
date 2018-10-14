var PersonTeste = artifacts.require("./PersonTeste.sol");

module.exports = function(deployer) {
  deployer.deploy(PersonTeste, "Teste", "teste@");
};
