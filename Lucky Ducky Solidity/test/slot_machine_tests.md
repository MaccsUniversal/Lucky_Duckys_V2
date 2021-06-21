Check player deposit.
This test proves contract accepts the players deposit.

        it("should deposit correct amount to contract for one player", async() => {
            await instance.deposit({from: player1, value: deposit1});
    
            const bal = await web3.eth.getBalance(instance.address)
            assert.equal(deposit1,bal,"contract balance is different to deposited amount");
        });  
    
Check multiple deposits.
Proves the contract can accept deposits from more than one player.
    
        it("should deposit correct amount for multiple players", async() =>{
    
            //deposit amounts
            await instance.deposit({from: player1, value: deposit1});
            await instance.deposit({from: player2, value: deposit2}); 
            
            // call player from mapping and convert .balance value to BigNumber for addition and conversion to number.
            p1 = await instance.player(player1);
            const p1bal = new BigNumber(web3.utils.fromWei(p1.balance));
            p2 = await instance.player(player2);
            const p2bal = new BigNumber(web3.utils.fromWei(p2.balance));
            const bothdeposits = p1bal.add(p2bal);
    
            const bal = await web3.eth.getBalance(instance.address);
            const contractBal = new BigNumber(web3.utils.fromWei(bal))
    
            const bd = bothdeposits.toNumber();
            const cb = contractBal.toNumber();
    
            assert.equal(bd, cb ,"contract balance is different to deposited amount");
        });


Checks withdrawal methods are working.

        it("should withdraw players entire balance from the contract", async() => {
        
            await instance.deposit({from: player1, value: deposit1});
            await instance.placeBet(toWei('1'), {from: player1});
            var p1 = await instance.player(player1);
            let bigBalance = new BigNumber(fromWei(p1.balance));
            let p1Balance = bigBalance.toNumber();
            let bigBetsPlaced = new BigNumber(fromWei(p1.placedBets));
            let p1BetsPlaced = bigBetsPlaced.toNumber();
            // console.log("Bets placed by player one: " + p1BetsPlaced);
            // console.log("player one's balance :" + p1Balance);
            await instance.withdrawAll(player1, {from: player1});
            p1 = await instance.player(player1);
            bigBalance = new BigNumber(fromWei(p1.balance));
            p1Balance = bigBalance.toNumber();
            bigBetsPlaced = new BigNumber(fromWei(p1.placedBets));
            p1BetsPlaced = bigBetsPlaced.toNumber();
            // console.log("Bets placed by player one: " + p1BetsPlaced);
            // console.log("player one's balance :" + p1Balance);        
            // const bal = await web3.eth.getBalance(instance.address);
            assert.equal(p1Balance,zero,"player 1 balance is not equal to zero");
            assert.equal(p1BetsPlaced,zero, "Bets placed by player 1 is not equal to zero");
        })
    
        it("should withdraw the players balance but leave bets on the table", async() => {
            await instance.deposit({from: player2, value: deposit2});
            await instance.placeBet(toWei('1'), {from: player2});
            let p2 = await instance.player(player2);
            let p2Balance = new BigNumber(fromWei(p2.balance));
            // console.log("players balance: "+ p2Balance.toNumber());
            let result = await instance.withdrawBalance(player2, toWei('1'), {from: player2});
            let withdrawalAmount = new BigNumber(fromWei(result.logs[0].args._amount));
            let wResult = p2Balance.sub(withdrawalAmount);
            // console.log("wResult: "+ wResult.toNumber());
            p2 = await instance.player(player2);
            let newBalance = new BigNumber(fromWei(p2.balance));
            // console.log("newBalance: " + newBalance.toNumber());
            assert.equal(wResult.toNumber(),newBalance.toNumber(),"withdrawal amount is not subtracted from player.balance only")
        })
    });

Checks players can transfer funds from their placedBets account to their balance.

    describe('#Undo-Bet', () =>{
        it("should reduce player.placedBet value and increase player.balance by desired amount", async() => {
            await instance.deposit({from: player1, value: deposit2});
            await instance.placeBet(toWei('2'), {from: player1});
            let amount = toWei('1');
            let p1 = await instance.player(player1);
            let playerBalance = new BigNumber(fromWei(p1.balance));
            let playerBets = new BigNumber(fromWei(p1.placedBets));
            let result = await instance.undoBet(amount, {from: player1});
            let uAmount = new BigNumber(fromWei(result.logs[0].args._amount));
            p1 = await instance.player(player1);
            let newPlayerBalance = new BigNumber(fromWei(p1.balance));
            let newPlayerBets = new BigNumber(fromWei(p1.placedBets));
            let betsCheck = playerBets.sub(uAmount);
            let balanceCheck = playerBalance.add(uAmount);
            assert.equal(betsCheck.toNumber(),newPlayerBets.toNumber(),"initial player.placedBets - undoBets amount != updated player.placedBets");
            assert.equal(balanceCheck.toNumber(),newPlayerBalance.toNumber(),"initial player.balance + undoBets amount != updated player.balance");
        })
    });
