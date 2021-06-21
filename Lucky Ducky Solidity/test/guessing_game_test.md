Checks player’s bet is stored in the games log.

This test proves the player’s guess is stored for comparison with the winning number further on in the distributerewards() method.

        it("store players guess", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance._confirmGuess(42, 1, {from: player1});
            let playerLog = await tgInstance.gamesLog(player1,0);
            let playerGuess = new BigNumber(playerLog.playerGuess);
            const bal = await web3.eth.getBalance(tgInstance.address)
            assert.equal(playerGuess,42,"Do not match");
        }); 
        
Checks the player’s bet is stored in the games log.

This test is written to prove that the players bet is stored in the games log for reference when distributing rewards.

        it("store players bet", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance._confirmGuess(42, 3, {from: player1});
            let playerLog = await tgInstance.gamesLog(player1,0);
            let betPlaced = new BigNumber(playerLog.betPlaced);
            const bal = await web3.eth.getBalance(tgInstance.address)
            assert.equal(betPlaced,3,"Do not match");
        }); 
    })
    
Compares winning number with players guess.

This test proves that if a player guesses the number to be returned incorrectly they will receive no rewards.

    describe('#reward distribution', () => {
        it("reward is '0' game loss", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance.fillLogs(745, 17, 46, 4, 8, 1, true, false, 2, {from: player1});
            await tgInstance._distributeReward({from: player1}); 
            playerLog = await tgInstance.gamesLog(player1,2);
            let reward = playerLog[4];
            assert.equal(reward,0,"Do not match");
        });  

Compares winning number with players guess.

Proves that if the returned number matches with the players guess they are able to claim a reward, which is twice the bet placed.

        it("reward double bet placed on game win", async() => {
            await tgInstance.deposit({from: player1, value: deposit1});
            await tgInstance.fillLogs(745, 4, 4, 4, 0, 1, true, false, 1, {from: player1});
            await tgInstance._distributeReward({from: player1}); 
            playerLog = await tgInstance.gamesLog(player1,1);
            let reward = playerLog.reward;
            assert.notEqual(reward,0,"Should not match");
            assert.equal(playerLog.reward, playerLog.betPlaced*2,"reward not distributed properly - should be double the bet placed")
        });



Check rewards can be claimed.

Proves that a player can claim their reward. The players balance is initialised at ‘0’ and by the end of the test they should have a balance equal to the reward distributed.
       
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

