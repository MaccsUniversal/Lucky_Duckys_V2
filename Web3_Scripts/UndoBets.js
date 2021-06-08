var betBalance;
var actionUndoButton = document.getElementById("actionUndoButton");
var undoInput = document.getElementById("UndoInput");

actionUndoButton.onclick = function(){
    get_playerBets();
    var uInput = undoInput.value;
    switch(true){
        case uInput == 0:
            alert("Error: Please input a value to return to your balance.");
            break;
        case uInput > ethBet:
            alert("Error: undo amount is greater than the bet balance. Please lower your requested undo amount.");
            break;
        case ethBet == 0:
            alert("No bets placed to move!");
            break;
        case uInput < 0:
            alert("Error: Cannot process this amount.");
            break;
        default:
            UndoBetAmount(uInput);
    }
}

undoBet.onclick = function(){
    openUndoBets();
}

async function openUndoBets(){
    startApp();
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    guessingGame.methods.getPlayerBets()
    .call({
        from: account,
    }, function(error,bal){
        if(!error){
            if(bal == 0){
                alert("No bets placed to move!");
            } else {
                document.getElementById('tint').style.display = 'block';
                document.getElementById("popUpBoxUndo").style.display = 'block';
                document.getElementById("info").style.display = 'none';
                document.getElementById("gptable-container").style.display = 'none';
            }
        } else {
            alert("Error: " + "You could be getting error because you are not registered as a player. Make a deposit to register as a player then place a bet.");
        }
    })
}

function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

async function UndoBetAmount(_amount){
    loaderOn();
    startApp()
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    var amount = web3js.utils.toWei(_amount,'ether');
    guessingGame.methods.undoBet(amount)
    .send({
        from: account,
        gas: 3000000
    })
    .on('receipt', function(receipt){
        loaderOff();
        console.log(receipt);
        get_ethBalance();
        get_playerBets();
    })
    .on('error', function(error){
        loaderOff();
        alert("Error: " + error.code + " message: " + error.message);
    })

}

function exitBets(){
    var tint = document.getElementById('tint');
    undoInput.value = '';
    tint.style.display = 'none';
    document.getElementById("popUpBoxUndo").style.display = 'none';
}