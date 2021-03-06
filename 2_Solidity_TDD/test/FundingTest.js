const Funding = artifacts.require("Funding");

contract("Funding", accounts => {
    const [firstAccount] = accounts;

    it("sets as owner", async () => {
        const funding = await Funding.new();
        assert.equal(await funding.owner.call(), firstAccount);
    });
})