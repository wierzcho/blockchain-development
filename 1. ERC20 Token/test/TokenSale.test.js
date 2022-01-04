const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");

var chai  = require('./chaisetup.js');
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale tests", async (accounts) => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    it("there shouldnt be any coins in my account", async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        
        return expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all coins should be in tokensale smart contract", async () => {
        let instance = await Token.deployed();
        let balance = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();

        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be possible to buy one token by simply sending ether to smart contract", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    });
});
