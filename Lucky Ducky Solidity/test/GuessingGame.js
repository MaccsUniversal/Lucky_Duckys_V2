const { assert } = require("chai");

var GuessingGame = artifacts.require('GuessingGame');

contract('GuessingGame', function(accounts) {

    const owner = accounts[0];
    const player1 = accounts[2];
    const player2 = accounts[4];
    const deposit1 = web3.utils.toWei('2', 'ether');
    const deposit2 = web3.utils.toWei('5', 'ether');
    const BigNumber = web3.utils.BN;
    const zero = 0;

    function fromWei(x){
        var number = web3.utils.fromWei(x, 'ether');
        return number;
    };

    function toWei(x){
        var number = web3.utils.toWei(x);
        return number;
    }

    beforeEach(async () => {
        instance = await GuessingGame.new();
    })

    it("Accept players guess", async() => {
        await instance.deposit({from: player1, value: deposit1});
        await instance.playGuessing(42, {from: player1});
        let winningNumber = instance.winningNumber();
        let guess = instance.guess();
        let isWinner = instance.isWinner();
        let reEntrancyMutex = instance.reEntrancyMutex();
        let cWinnerMutex = instance.cWinnerMutex();

        const bal = await web3.eth.getBalance(instance.address)
        assert.notEqual(winningNumber,zero,"");
        assert.notEqual(guess, zero,"");
        assert.equal(isWinner,"false","");
        assert.equal(reEntrancyMutex,"false","");
        assert.equal(cWinnerMutex,"false","");


    });  

}) 