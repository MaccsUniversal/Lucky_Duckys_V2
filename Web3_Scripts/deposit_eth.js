var accounts;
var account;
var balance;
var noBalance;
var guessingGame;
var ethBal;

var eth_bets = document.getElementById("eth-bets");
var eth_balance = document.getElementById("eth-balance"); 
var depositInput = document.getElementById("depositInput");
var depositButton = document.getElementById("depositButton");

depositButton.onclick = function () {depositButtonClicked()};

function depositButtonClicked(){
    openDeposits();
}

async function openDeposits(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    balance = await web3js.eth.getBalance(account, (error, bal) =>{
        if(!error){
            if(web3js.utils.fromWei(bal) == 0){
                alert("ETH Balance is 0. Try topping up your account with ETH.");
            } else {
                document.getElementById('tint').style.display = 'block';
                document.getElementById("popUpBoxDeposit").style.display = 'block';
                document.getElementById("info").style.display = 'none';
                document.getElementById("gptable-container").style.display = 'none';
            }
        } else {
            alert("Error", error);
        }
    });
}

actionDepositButton.onclick = async function deposit(){
    const deposit_amount = depositInput.value;
    switch (true){
        case deposit_amount == 0:
            alert("Enter an amount to deposit");
            break;
        case deposit_amount > 1:
            alert("You can only deposit upto 1 ETH");
            break;
        case deposit_amount < 0:
            alert("cannot process this deposit amount")
        case deposit_amount > balance:
            alert("Insufficient amount in wallet to cover deposit.")
            break;
        default:
            depositEth();
            break;
    }    
}


function depositEth(){
    loaderOn();
    const deposit_amount = depositInput.value;
    startApp();
    guessingGame.methods.deposit()
    .send({
        from: account,
        gas: 3000000,
        value: web3js.utils.toWei(deposit_amount,'ether')
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        loaderOff();
        get_ethBalance();
        alert("Deposit Successful");
        exitDeposit();
        window.location.reload();
    })
    .on('transactionHash', function(hash){
        console.log(hash);
        exitDeposit();
    })
    .on('error', function(error){
        loaderOff();
        console.log(error);
        alert("Error: " + error.code + " message: " + error.message);
    })
}

function get_ethBalance(){
    guessingGame.methods.getPlayerBalance()
    .call({
        from: account
    }, function(error,result){
        if(!error){
            console.log(result);
            ethBal = web3js.utils.fromWei(result,'ether');
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

function exitDeposit(){
    var tint = document.getElementById('tint');
    depositInput.value = '';
    tint.style.display = 'none';
    document.getElementById("popUpBoxDeposit").style.display = 'none';
}