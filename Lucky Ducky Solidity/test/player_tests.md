Initializes a new player

Asserts that a new player has been registered by proving that player.isPlayer == true.

        it('should initialize a new player', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player.isPlayer,true,"is not player"); 
        })
        
Checks the player counter is incremented when a new player is registered.

When a new player is registered the playerCount variable should increment by 1. 

        it('should increment playerCount', async () => {
            await instance._newPlayer({from: player1});
            result = await instance.getCounter({from: player1});
            assert.equal(result.toNumber(),1,'playerCount did not increment');
        })
        
Checks that address depositing funds is registered as a player.

Checks the player.wallet is equal to the account address calling the deposit function.

        it('should add sender as player', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player2,player.wallet,'Address does not match');
        })
        
Checks that a user is unable to register more than one account.

Here I used a conditional statement in place of the ‘required’ method to prove that an address is not able to register to more than one account.

        it('should not let user register twice', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            await instance._newPlayer({from: player2});
            result = await instance.getCounter({from: player1});
            assert.equal(result,true,'player was registered twice');
        })

Checks new player is registered with '0' balance/bets

        it('should initialize balances/placedbets to "0"', async () => {
            await instance._newPlayer({from: player2});
            player = await instance.player(player2);
            assert.equal(player.balance,0,"balance is not 0"); 
            assert.equal(player.placedBets,0,"bet placed is not 0");
        })

