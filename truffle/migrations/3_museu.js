var Museu = artifacts.require("./museu/ContaCorrenteMuseu.sol");

module.exports = function(deployer) {
  deployer.deploy(Museu);
};
