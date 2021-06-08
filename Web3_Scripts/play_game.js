var betBalance;
var account;
var accounts;
var gamesPlayed;
var gameId;
var playerGuess;
var winningNumber;
var betPlaced;
var reward;
var claim;


const betInput = document.getElementById("betInput")
const guessInput = document.getElementById("guessInput");
var playButton = document.getElementById("playButton");
var checkButton = document.getElementById("checkButton");


checkButton.onclick = async function (){
    checkButton.style.animationPlayState = 'running';
    checkButton.innerText = "Please Wait... ";
    setTimeout(checkButtonClicked,30000);
    currentPlayNo();
    setTimeout(function(){
        checkButton.innerText = "Generating Number... ";
    }, 9000)
    setTimeout(function(){
        checkButton.innerText = "Almost There... ";
    }, 18000)
    setTimeout(function(){
        checkButton.innerText = "Getting Results... ";
    }, 25000)
    checkButton.disabled = true;
}

playButton.onclick = async function main(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    account = accounts[0];
    startApp();   
    switch(true){
        case guessInput.value < 1:
            alert("Please choose a number between 1 and 100.");
            break;
        case guessInput.value > 100:
            alert("Please choose a number between 1 and 100");
            break;
        default:
            checkBet();
            break;
    }
    
}


function checkBet(){
    guessingGame.methods.getPlayerBets()
    .call({
        from: account,
        gas: 3000000,
    }, function(error, betBal){
        if(!error){
            betBalance = web3js.utils.fromWei(betBal);
            switch(true){
                case betInput.value > betBalance:
                    alert("Insufficient bet balance to place this bet.");
                    break;
                case betInput.value < 0:
                    alert("Cannot process bet of this amount");
                    break;
                case betInput.value == 0:
                    alert("Cannot process bet of this amount");
                    break;
                default:
                    play();
                    break;
            }
        } else {
            console.log(error);
            alert("Error: " + error.code + " message: " + error.message);
            alert("Error: " + error.code + " message: This Error has most likely occurred because you have not deposited any ETH to play.");
        }
    })
}

function play(){
    loaderOn();
    startApp();
    console.log(web3js.utils.toWei(betBalance));
    guessingGame.methods.playGame(guessInput.value, web3js.utils.toWei(betInput.value))
    .send({
        from: account,
        gas: 3000000
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        get_playerBets();
        loaderOff();
        checkResults();
    })
    .on('error', function(error){
        loaderOff();
        alert("Error: " + error.code + " message: " + error.message);
    })
}


function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

async function getAccountInfo(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    account = accounts[0];
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

function loaderOn(){
    document.getElementById("loader-container").style.display = 'block';
}

function loaderOff(){
    document.getElementById("loader-container").style.display = 'none';
}

function currentPlayNo(){
    guessingGame.methods.playCounter(account)
    .call({
        from: account,
        gas: 3000000
    }, function(error,result){
        if(!error){
            console.log(result);
            gamesPlayed = result;
        } else {
            alert("error: " + error.code + " message: " + error.message);
        }
    })
}

function checkResults(){

    document.getElementById("tint").style.display = 'block';
    document.getElementById("checkButton").style.display = 'block';

    //1. wait until transaction receipt comes back from miner. 
    //2. after receipt keep loader on for 15s to ensure VRN is returned. 
    //3. call method on contract for the results of the last round played. 
    //4. display the results in a single row table and allow winners to claim rewards  (and/or stake bet- this is a phase 2 development).
     
    // I M P L E M E N T A T I O N S
    // 1 - implemented in play().
    // 2 - implemented in checkResults().
    // 3 & 4 - implemented in getLastPlay().

    // Note: Phase 2 will involve staking the losers bet. This will mean programming funds to be transferred to staking pool. 
    // These funds will offer rewards but are not recoverable for game losers.
    // Winners can choose to stake or withdraw bet. staked funds are recoverable for Winners.
}

function checkButtonClicked(){
    guessingGame.methods.getResult()
    .call({
        from: account,
        gas: 3000000
    }, function(error, result){
        if(!error){
            console.log(result);
            gameId = result[0][0];
            playerGuess = result[1][0];
            winningNumber = result[2][0];
            var weibetPlaced = result[3][0];
            betPlaced = web3js.utils.fromWei(weibetPlaced.toString(),'ether');
            var weireward = result[4];
            reward = web3js.utils.fromWei(weireward.toString(),'ether');
            checkButton.style.display = 'none';
            checkButton.innerText = 'Check Results';
            removeRows();
            createTable();
            document.getElementById("gptable-container").style.display = 'block';
            checkButton.style.animationPlayState = 'paused';
            checkButton.disabled = false;

        } else {
            console.log(error);
        }
    })
}

function removeRows(){
    while(document.getElementById("newRow")){
        document.getElementById("newTable").removeChild(document.getElementById("newRow"));
    }
}

function createTable(){

        //claim button
        var claimButton = document.createElement("button");
        claimButton.setAttribute('id','claim-button');
        claimButton.innerText = "Claim";
        claimButton.style.backgroundColor = 'dodgerblue';
        claimButton.style.borderRadius ='10px';
        claimButton.style.width = '100px';
        claimButton.style.borderWidth = '2px';
        claimButton.style.border = 'none';
        claimButton.style.color ='white';
        claimButton.style.margin = '20px';
        claimButton.style.padding = '20px';
    
        var newTable = document.getElementById("newTable");
        var newRow = document.createElement("tr");
        newRow.setAttribute('id','newRow');
        var noCell = document.createElement("td");
        var gameIdCell = document.createElement("td");
        var guessCell = document.createElement("td");
        var winningNumberCell = document.createElement("td");
        var betCell = document.createElement("td");
        var rewardCell = document.createElement("td");
        var claimedCell = document.createElement("td");

        noCell.innerHTML = gamesPlayed;     
        gameIdCell.innerHTML = gameId;
        claimButton.value = gameId;
        claimButton.name = gamesPlayed;
        claimButton.onclick = function(){makeClaim();}
        guessCell.innerHTML = playerGuess;
        winningNumberCell.innerHTML = winningNumber;
        betCell.innerHTML = betPlaced;
        rewardCell.innerHTML = reward;
        claimedCell.innerHTML = false;

        newRow.appendChild(noCell);
        newRow.appendChild(gameIdCell);
        newRow.appendChild(guessCell);
        newRow.appendChild(winningNumberCell);
        newRow.appendChild(betCell);
        newRow.appendChild(rewardCell);
        newRow.appendChild(claimedCell);
        if(playerGuess != winningNumber){
            var results = document.getElementById("results");
            results.innerText = "Better Luck Next Time..."
            results.style.display = 'block';
            var resultText = document.getElementById("resultText");
            resultText.innerHTML = "Ok so you didn't win this time but remember all is not lost!<br>To find out how your bet can earn you rewards go to the info page for more details."
            resultText.style.display = 'block';
            claimButton.disabled = true;
            claimButton.style.backgroundColor = 'dimgrey';
            claimButton.style.color ='grey';
        } else {
            results = document.getElementById("results");
            results.innerText = "Winner!"
            results.style.display = 'block';
            resultText = document.getElementById("resultText");
            resultText.innerHTML = "Congratulations!<br>Click the claim button to receive your reward and update your balance."
            resultText.style.display = 'block';
        }
        newRow.appendChild(claimButton);
        newTable.appendChild(newRow);
} 

   