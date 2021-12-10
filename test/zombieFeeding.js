const ZombieFeeding = artifacts.require("ZombieFeeding");
const zombieNames = ["Zombie 1", "Zombie 2"];
const utils = require("./helpers/utils");
const time = require("./helpers/time");

contract("ZombieFeeding", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;

    beforeEach( async () => {
        contractInstance = await ZombieFeeding.new();
    });

    it("test feed and multiply", async() => {
        let result;
        result = await contractInstance.createRandomZombie(zombieNames[0], {from: alice});
        const firstZombieId = result.logs[0].args.zombieId.toNumber();
        result = await contractInstance.createRandomZombie(zombieNames[1], {from: bob});
        const secondZombieId = result.logs[0].args.zombieId.toNumber();

        await time.increase(time.duration.days(1));
        await contractInstance.feedAndMultiply(firstZombieId, secondZombieId, "zombie", {from: alice});

        assert.equal(result.receipt.status, true);
    })
})