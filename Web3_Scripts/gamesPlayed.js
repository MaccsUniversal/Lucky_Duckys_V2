var gamesPlayed = document.getElementById("gamesPlayedButton");
var gameNo;
var account;
var accounts;
var guesses;
var gameIds;
var winningNumbers;
var betsPlaced;
var rewards;
var claims;

gamesPlayedButton.onclick = function () {gamesPlayedClicked()};

async function gamesPlayedClicked(){
    accounts = await ethereum.request({ method: 'eth_requestAccounts'});
    account = accounts[0];
    removeRows();
    allGamesPlayed();
}

function allGamesPlayed(){
    startApp();
    guessingGame.methods.getLogs()
    .call({
        from: account,
        gas: 3000000
    }, function(error, log){
        if(!error){
            console.log(log);
            gameIds = log[0];
            guesses = log[1];
            winningNumbers = log[2];
            betsPlaced = log[3];
            rewards = log[4];
            claims = log[5];
            gameLogs();
            document.getElementById("gptable-container").style.display = 'block';
            document.getElementById("tint").style.display = 'block';
            document.getElementById("info").style.display = 'none';
        } else {
            console.log(error);
        }
        
    })
}

function getPlayNo(){
    guessingGame.methods.playCounter(account)
    .call({
        from: account,
        gas: 3000000
    }, function(error,result){
        if(!error){
            console.log(result);
            gameNo = result;
        } else {
            alert("error: " + error.code + " message: " + error.message);
        }
    })
}

function startApp(){
    guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

function gameLogs(){
    var i = 0;
    var len = gameIds.length;
    for(;i<len;i++){

        //claim button
        var claimButton = document.createElement("button");
        claimButton.setAttribute('id','claim-button'+i)
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
        newRow.setAttribute('id', 'newRow');
        var noCell = document.createElement("td");
        var gameIdCell = document.createElement("td");
        var guessCell = document.createElement("td");
        var winningNumberCell = document.createElement("td");
        var betCell = document.createElement("td");
        var rewardCell = document.createElement("td");
        var claimedCell = document.createElement("td");

        noCell.innerHTML = i + 1;     
        gameIdCell.innerHTML = gameIds[i];
        claimButton.value = gameIds[i];
        claimButton.name = i + 1;
        claimButton.addEventListener('click', function(e){
            if(e.target.value != '' && e.target.name != ''){
                claimRewards(e.target.value, e.target.name);
            }
        })
        guessCell.innerHTML = guesses[i];
        winningNumberCell.innerHTML = winningNumbers[i];
        betCell.innerHTML = web3js.utils.fromWei(betsPlaced[i].toString(),'ether');
        rewardCell.innerHTML = web3js.utils.fromWei(rewards[i].toString(),'ether');
        claimedCell.innerHTML = claims[i];

        newRow.appendChild(noCell);
        newRow.appendChild(gameIdCell);
        newRow.appendChild(guessCell);
        newRow.appendChild(winningNumberCell);
        newRow.appendChild(betCell);
        newRow.appendChild(rewardCell);
        newRow.appendChild(claimedCell);
        if(guesses[i] == winningNumbers[i] && claims[i] == true || guesses[i] != winningNumbers[i]){
            claimButton.disabled = true;
            claimButton.style.backgroundColor = 'dimgrey';
            claimButton.style.color ='grey';
        }
        newRow.appendChild(claimButton);
        newTable.appendChild(newRow);
        // document.getElementById("claim-button"+i).onclick = function() {claimRewards(claimButton.value, claimButton.name);}
    }
}

function makeClaim(){
    window.addEventListener('click', function(e){
        if(e.target.value != '' && e.target.name != ''){
            claimRewards(e.target.value, e.target.name);
        }
    })
}
