var accounts;
var account;
var balance;
var noBalance;
var guessingGame;
var ethBal;
var ethBet;

var eth_bets = document.getElementById("eth-bets");
var bTbInput = document.getElementById("bTbInput");
var balanceToBets = document.getElementById("balanceToBets");

balanceToBets.onclick = function () {toBetsClicked()};

function toBetsClicked(){
    openBets();
}

async function openBets(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    balance = await web3js.eth.getBalance(account, (error, bal) =>{
        if(!error){
            if(web3js.utils.fromWei(bal) == 0){
                alert("ETH Balance is 0. Try topping up your account with ETH.");
            } else {
                document.getElementById("popUpBoxBets").style.display = 'block';
                tint.style.display = 'block';
                document.getElementById("info").style.display = 'none';
                document.getElementById("gptable-container").style.display = 'none';
                startApp();
            }
        } else {
            alert("Error", error);
        }
    });
}

actionBetsButton.onclick = async function bet(){
    check_ethBalance();   
}


function betEth(){
    loaderOn();
    const bet_amount = web3js.utils.toWei(bTbInput.value);
    startApp();
    guessingGame.methods.placeBet(bet_amount)
    .send({
        from: account,
        gas: 3000000
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        loaderOff();
        get_ethBalance();
        get_playerBets();
        alert("Bet placed Successfully!");
        exitBets();
        window.location.reload();
    })
    .on('transactionHash', function(hash){
        console.log(hash);
    })
    .on('error', function(error){
        loaderOff();
        console.log(error);
        alert("Error: " + error.code + " message: " + error.message);
    })
}

function check_ethBalance(){
    guessingGame.methods.getPlayerBalance()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            console.log(result);
            ethBal = web3js.utils.fromWei(result,'ether');
            const bet_amount = bTbInput.value;
            switch (true){
                case bet_amount == 0:
                    alert("Enter an amount to place as a bet.");
                    break;
                case bet_amount > ethBal:
                    alert("There's not enough in your balance to place this bet.");
                    break;
                case bet_amount < 0:
                    alert("cannot process this bet amount.");
                    break;
                default:
                    betEth();
                    break;
            }
        } else {
            console.log(error);
        }
    })
}

function get_playerBets(){
    guessingGame.methods.getPlayerBets()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            console.log(result);
            ethBet = web3js.utils.fromWei(result,'ether');
            eth_bets.innerText = ethBet + " Ξ";
        } else {
            console.log(error);
            eth_bets.innerText = "0.0" + " Ξ";
        }
    })
}

function get_ethBalance(){
    guessingGame.methods.getPlayerBalance()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            console.log(result);
            var ethBal = web3js.utils.fromWei(result,'ether');
            eth_balance.innerText = ethBal + " Ξ";
        } else {
            console.log(error);
            eth_balance.innerText = "0.0" + " Ξ";
        }
    })
}

function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
  }

function loaderOn(){
    document.getElementById("loader-container").style.display = 'block';
}

function loaderOff(){
    document.getElementById("loader-container").style.display = 'none';
}

function exitBets(){
    var tint = document.getElementById('tint');
    bTbInput.value = '';
    tint.style.display = 'none';
    document.getElementById("popUpBoxBets").style.display = 'none';
}