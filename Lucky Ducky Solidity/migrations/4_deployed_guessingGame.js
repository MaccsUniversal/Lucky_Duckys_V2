var GuessingGame = artifacts.require("./GuessingGame.sol");

module.exports = function(deployer) {
  deployer.deploy(GuessingGame);
};

