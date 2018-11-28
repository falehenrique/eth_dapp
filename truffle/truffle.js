var mnemonic = "seed gentle sample organ wheat either next motor coyote true soft fitness"
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 700000,
      network_id: "*"
    },
    testnet: {
      host: "127.0.0.1",
      port: 7545,
      gas: 700000,
      network_id: "*"
    },  
    mainnet: {
      host: "127.0.0.1",
      port: 7545,
      gas: 4500000,
      network_id: "*"
    },
    rinkeby: {
      provider: function(){
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/74fc548643b6425e8ef5db060ad0e657")
      },
      network_id: 4,
      gas: 4500000
    },
  }
}
