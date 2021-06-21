const { assert } = require("chai");

var GuessingGame = artifacts.require('GuessingGame');
var TestGame = artifacts.require('TestGame');

contract('GuessingGame', function(accounts) {

    const owner = accounts[0];
    const player1 = accounts[2];
    const player2 = accounts[4];
    const deposit1 = web3.utils.toWei('2', 'ether');
    const deposit2 = web3.utils.toWei('5', 'ether');
    const BigNumber = web3.utils.BN;
    const zero = 0;
    const KOVAN_KEYHASH = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    const KOVAN_FEE = '100000000000000000'
    const KOVAN_LINK_TOKEN = '0xa36085F69e2889c224210F603D836748e7dC0088'
    const KOVAN_VRF_COORDINATOR = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'

    function fromWei(x){
        var number = web3.utils.fromWei(x, 'ether');
        return number;
    };

    function toWei(x){
        var number = web3.utils.toWei(x);
        return number;
    }

    beforeEach(async () => {
        instance = await GuessingGame.new(KOVAN_LINK_TOKEN, KOVAN_KEYHASH, KOVAN_VRF_COORDINATOR, KOVAN_FEE);
        tgInstance = await TestGame.new(KOVAN_LINK_TOKEN, KOVAN_KEYHASH, KOVAN_VRF_COORDINATOR, KOVAN_FEE);
    })

    describe('#game log storage', () => {
        it("store players guess", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance._confirmGuess(42, 1, {from: player1});
            let playerLog = await tgInstance.gamesLog(player1,0);
            let playerGuess = new BigNumber(playerLog.playerGuess);
            const bal = await web3.eth.getBalance(tgInstance.address)
            assert.equal(playerGuess,42,"Do not match");
        }); 

        it("store players bet", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance._confirmGuess(42, 3, {from: player1});
            let playerLog = await tgInstance.gamesLog(player1,0);
            let betPlaced = new BigNumber(playerLog.betPlaced);
            const bal = await web3.eth.getBalance(tgInstance.address)
            assert.equal(betPlaced,3,"Do not match");
        }); 
    })

    describe('#reward distribution', () => {
        it("reward is '0' game loss", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance.fillLogs(745, 17, 46, 4, 8, 1, true, false, 2, {from: player1});
            await tgInstance._distributeReward({from: player1}); 
            playerLog = await tgInstance.gamesLog(player1,2);
            let reward = playerLog[4];
            assert.equal(reward,0,"Do not match");
        });  

        it("reward double bet placed on game win", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance.fillLogs(745, 4, 4, 4, 0, 1, true, false, 1, {from: player1});
            await tgInstance._distributeReward({from: player1}); 
            playerLog = await tgInstance.gamesLog(player1,1);
            let reward = playerLog.reward;
            assert.notEqual(reward,0,"Should not match");
            assert.equal(playerLog.reward, playerLog.betPlaced*2,"reward not distributed properly - should be double the bet placed")
        });
    })

    describe('#Claim Rewards', () => {
        it("claims reward", async() => {
            await tgInstance.deposit({from: player1, value: 0});
            await tgInstance.fillLogs(745, 4, 4, 4, 0, 1, true, false, 1, {from: player1});
            await tgInstance._distributeReward({from: player1});
            let gId = new BigNumber(745);
            let counter = 1;
            await tgInstance.claimReward(gId, counter, {from: player1});
            playerLog = await tgInstance.gamesLog(player1,1);
            player = await tgInstance.player(player1);
            let rewardClaimed = playerLog.claimed;
            let amountClaimed = playerLog.reward;
            let playerBalance = player.balance;
            assert.equal(rewardClaimed,true,"Do not match");
            assert.equal(amountClaimed, playerLog.betPlaced*2,"No reward distributed");
            assert.equal(amountClaimed.toNumber(), playerBalance.toNumber(),"Player Balance not updated");
        }); 
    })

    // describe('#Contract Owner', () => {
    //     it("should return contract owner", async() => {
    //         await tgInstance.deposit({from: player1, value: 0});
    //         let contractOwner = await tgInstance.owner();
    //         console.log(contractOwner);
    //     }); 
    // })

}) 