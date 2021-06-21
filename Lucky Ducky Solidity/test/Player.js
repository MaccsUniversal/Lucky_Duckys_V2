const { assert } = require("chai");

var TestPlayer = artifacts.require('TestPlayer');

contract('TestPlayer', function(accounts) {

    const player1 = accounts[2];
    const player2 = accounts[4];

    beforeEach(async () => {
        instance = await TestPlayer.new();
    })
    describe('#Add New Player', () => {
        it('should initialize a new player', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player.isPlayer,true,"is not player"); 
        })
        it('should increment playerCount', async () => {
            await instance._newPlayer({from: player1});
            result = await instance.getCounter({from: player1});
            assert.equal(result.toNumber(),1,'playerCount did not increment');

        })
        it('should add sender as player', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player2,player.wallet,'Address does not match');
        })
        it('should not let user register twice', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            await instance._newPlayer({from: player2});
            result = await instance.getCounter({from: player1});
            assert.equal(result,true,'player was registered twice');
        })
        it('should initialize balances to "0"', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player.balance,0,"balance is not 0"); 
            assert.equal(player.placedBets,0,"bet placed is not 0");
        })
    })
})