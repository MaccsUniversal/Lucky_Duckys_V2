var fee = 1000000000000000000;

function checkLinkBalance(){
    startApp();
    guessingGame.methods.checkLinkBalance()
    .call({
        from: account,
        gas:3000000
    }, function(error,linkBal){
        if(!error){
            if(linkBal < fee){
                alert("Gaming contract doesn't have enough LINK tokens to run the game.<br>Please notify the contract owner.");
            }
        } else {
            alert("Error: " + error.code + " message: " + error.message);
        }
    })
}