var withdrawAll = document.getElementById("withdrawAll");
var yes_withdraw_all_button = document.getElementById("yes-withdraw-all-button");
var no_withdraw_all_button = document.getElementById("no-withdraw-all-button");
var playerEthBal;
var playerBetBal;

withdrawAll.onclick = function(){openWithdrawAll();}
yes_withdraw_all_button.onclick = function(){withdrawAllFunds();}
no_withdraw_all_button.onclick = function(){exitWithdrawAll();}

async function openWithdrawAll(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    startApp();
    ethBalance();
}


function ethBalance(){
    guessingGame.methods.getPlayerBalance()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            playerEthBal = web3js.utils.fromWei(result,'ether');
            guessingGame.methods.getPlayerBets()
            .call({
                from: account
            }, function(error,betBal){
                if(!error){
                    playerBetBal = web3js.utils.fromWei(result,'ether');
                    if(playerBetBal > 0 || 
                        playerEthBal > 0){
                            document.getElementById('tint').style.display = 'block';
                            document.getElementById("popUpBox-withdraw-all").style.display = 'block';
                            document.getElementById("info").style.display = 'none';
                            document.getElementById("gptable-container").style.display = 'none';
                    } else {
                        alert("Nothing to withdraw");
                    }
                }
            })
        } else {
            console.log(error);
            eth_balance.innerText = "0.0" + " Ξ";
            alert("Error: You may be seeing this error because you have no balance or you have not registered as a player. Make a deposit to register as a player and add to your balance.")
        }
    })
}

function betBalance(){
    guessingGame.methods.getPlayerBets()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            playerBetBal = web3js.utils.fromWei(result,'ether');
            if(!playerBetBal == 0 && 
                !playerEthBal == 0){
                    document.getElementById('tint').style.display = 'block';
                    document.getElementById("popUpBox-withdraw-all").style.display = 'block';
                    document.getElementById("info").style.display = 'none';
                    document.getElementById("gptable-container").style.display = 'none';
            } else {
                alert("Nothing to withdraw");
            }
        } else {
            console.log(error);
            eth_balance.innerText = "0.0" + " Ξ";
            alert("Error: You may be seeing this error because you have no balance or you have not registered as a player. Make a deposit to register as a player and add to your balance.")
        }
    })
}

function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

async function withdrawAllFunds(){
    loaderOn();
    startApp()
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    guessingGame.methods.withdrawAll(account)
    .send({
        from: account,
        gas: 3000000
    })
    .on('receipt', function(receipt){
        loaderOff();
        console.log(receipt);
        alert("balance withdrawn to your wallet!");
        exitWithdrawAll();
        window.location.reload();
    })
    .on('error', function(error){
        loaderOff();
        alert("Error: " + error.code + " message: " + error.message);
    })
}

function exitWithdrawAll(){
    var tint = document.getElementById('tint');
    withdraw_balance_input.value = '';
    tint.style.display = 'none';
    document.getElementById("popUpBox-withdraw-all").style.display = 'none';
}