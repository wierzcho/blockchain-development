const path = require("path");
// require('dotenv').config({path: './.env'});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;
const mnemonic = "soul spike trend conduct reopen bamboo system table annual method opera acoustic";

module.exports = {
// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!
contracts_build_directory: path.join(__dirname, "client/src/contracts"),
networks: {
    development: {
      port: 7575,
      network_id: "*",
      host: "127.0.0.1"
    },
    ganache_local: {
      provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:8545", MetaMaskAccountIndex ),
      network_id: 5777,
    },
    goerli_infura: {
      provider: new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/c81c5a952d6843e3ba47855c7cd7db04", MetaMaskAccountIndex ),
      network_id: 5,
    }
},
compilers: {
  solc: {
      version: "0.6.1",
      }
  }
};