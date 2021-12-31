const Operator = artifacts.require("Operator");

require("dotenv").config({path: "../.env"});

module.exports = async function (deployer, network, accounts) {

  await deployer.deploy(Operator, process.env.SCORE_TOKEN, accounts[0]);
  let operatorInstance = await Operator.deployed();

  await operatorInstance.setAuthorizedSenders([process.env.ORACLE_NODE]);

  await operatorInstance.transferOwnership(process.env.ADMIN_WALLET);
};