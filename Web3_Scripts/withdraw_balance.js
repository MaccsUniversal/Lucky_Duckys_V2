var playerEthBal;
var withdrawBalance = document.getElementById("withdrawBalance");
var withdraw_balance_input = document.getElementById("withdraw-balance-input");
var withdraw_balance_button = document.getElementById("withdraw-balance-button");

withdrawBalance.onclick = function(){openWithdrawBalance();}
withdraw_balance_button.onclick = function(){actionWithdrawal();}


async function openWithdrawBalance(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    startApp();
    checkEthBalance();
}

function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

function checkEthBalance(){
    guessingGame.methods.getPlayerBalance()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            playerEthBal = web3js.utils.fromWei(result,'ether');
            if(playerEthBal != 0){
                document.getElementById('tint').style.display = 'block';
                document.getElementById("popUpBox-withdraw-balance").style.display = 'block';
                document.getElementById("info").style.display = 'none';
                document.getElementById("gptable-container").style.display = 'none';
            } else {
                alert("Your current balance is '0'.");
            }

        } else {
            console.log(error);
            eth_balance.innerText = "0.0" + " Ξ";
            alert("Error: You may be seeing this error because you have no balance or you have not registered as a player. Make a deposit to register as a player and add to your balance.")
        }
    })
}

function actionWithdrawal(){
    var wInput = withdraw_balance_input.value;
    switch(true){
        case wInput == 0:
            alert("Error: Amount '0' cannot be withdrawn from balance")
            break;
        case wInput > playerEthBal:
            alert("Error: amount requested is larger than your balance. Please lower the requested amount");
            break;
        case wInput < 0:
            alert("Error: Cannot process withdrawls of this amount");
            break;
        default:
            wBalance();
    }
}

async function wBalance(){
    loaderOn();
    startApp();
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    var wInput = web3js.utils.toWei(withdraw_balance_input.value,'ether');
    guessingGame.methods.withdrawBalance(account, wInput)
    .send({
        from: account,
        gas: 3000000
    })
    .on('receipt', function(receipt){
        loaderOff();
        console.log(receipt);
        alert("balance withdrawn to your wallet!");
        exitBalanceWithdraw();
        window.location.reload();
    })
    .on('error', function(error){
        loaderOff();
        alert("Error: " + error.code + " message: " + error.message);
    })
}

function exitBalanceWithdraw(){
    var tint = document.getElementById('tint');
    withdraw_balance_input.value = '';
    tint.style.display = 'none';
    document.getElementById("popUpBox-withdraw-balance").style.display = 'none';
}