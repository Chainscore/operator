const Operator = artifacts.require("Operator");
const TestToken = artifacts.require("TestToken");

require("dotenv").config({path: "../.env"});

module.exports = async function (deployer, network, accounts) {
  let sender, token;

  switch(network){
    case "hm": {
      token = process.env.SCORE_TOKEN_HM;
      sender = process.env.ORACLE_NODE_HM;
      break;
    }
    case "ht": {
      token = process.env.SCORE_TOKEN_HT;
      sender = process.env.ORACLE_NODE_HT;
      break;
    }
    case "rinkeby": {
      token = process.env.SCORE_TOKEN_RINKEBY;
      sender = process.env.ORACLE_NODE_RINKEBY;
      break;
    }
    case "am": {
      token = process.env.SCORE_TOKEN_AM;
      sender = process.env.ORACLE_NODE_AM;
      break;
    }
    case "at": {
      token = process.env.SCORE_TOKEN_AT;
      sender = process.env.ORACLE_NODE_AT;
      break;
    }
    default: {
      await deployer.deploy(TestToken);
      token = (await TestToken.deployed()).address;
    }
  }

  await deployer.deploy(Operator, token, accounts[0]);
  let operatorInstance = await Operator.deployed();

  await operatorInstance.setAuthorizedSenders([sender]);

  await operatorInstance.transferOwnership(process.env.ADMIN_WALLET);
};