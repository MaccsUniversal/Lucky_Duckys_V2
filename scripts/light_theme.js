var themeObject = document.getElementById("themeObject");
var menuObject = document.getElementById("menuObject");
var walletConnector = document.getElementById("walletConnector");
var playButton = document.getElementById("playButton");
var gamesPlayedButton = document.getElementById("gamesPlayedButton");
var connectedWallet = document.getElementById("connectedWallet");
var depositButton = document.getElementById("depositButton");
var balanceToBets = document.getElementById("balanceToBets");
var exit = document.getElementById("exit");
var claimRewardItem = document.getElementById("claimRewardItem");
var gamesPlayedItem = document.getElementById("gamesPlayedItem");
var infoItem = document.getElementById("infoItem");
var actionDepositButton = document.getElementById("actionDepositButton");
var actionBetsButton = document.getElementById("actionBetsButton");
//bool for menu object
var isMenuActive = false;


//mouse over & mouse out functions
themeObject.onmouseover = function() {themeMouseOver()};
themeObject.onmouseout = function() {themeMouseOut()};
menuObject.onmouseover = function() {menuMouseOver()};
menuObject.onmouseout = function() {menuMouseOut()};
walletConnector.onmouseover = function() {walletMouseOver()};
walletConnector.onmouseout = function() {walletMouseOut()};
playButton.onmouseover = function () {playMouseOver()};
playButton.onmouseout = function () {playMouseOut()};
gamesPlayedButton.onmouseover = function () {gamesPlayedMouseOver()};
gamesPlayedButton.onmouseout = function () {gamesPlayedMouseOut()};
connectedWallet.onmouseover = function () {connectedWalletMouseOver()};
connectedWallet.onmouseout = function () {connectedWalletMouseOut()};
depositButton.onmouseover = function () {depositMouseOver()};
depositButton.onmouseout = function () {depositMouseOut()};
balanceToBets.onmouseover = function () {betsMouseOver()};
balanceToBets.onmouseout = function () {betsMouseOut()};
actionDepositButton.onmouseover = function () {actionDepositMouseOver()};
actionDepositButton.onmouseout = function () {actionDepositMouseOut()};
actionBetsButton.onmouseover = function () {actionBetsMouseOver()};
actionBetsButton.onmouseout = function () {actionBetsMouseOut()};

//onclick functions
menuObject.onclick = function () {menuClicked()};
exit.onclick = function () {exitClicked()};
gamesPlayedButton.onclick = function () {gamesPlayedClicked()};
balanceToBets.onclick = function () {toBetsClicked()};
depositButton.onclick = function () {depositButtonClicked()};


function themeMouseOver(){
    var innerCircle = document.getElementById('innerCircle');
    var outerCircle = document.getElementById('outerCircle');
    outerCircle.style.borderColor = 'white';
    themeObject.style.backgroundColor = 'black';
    themeObject.style.borderColor = '#D44CF0';
    innerCircle.style.borderColor = 'white';
    innerCircle.style.backgroundColor = 'white';

}

function themeMouseOut(){
    var innerCircle = document.getElementById('innerCircle');
    var outerCircle = document.getElementById('outerCircle');
    outerCircle.style.borderColor = 'black';
    themeObject.style.backgroundColor = 'white';
    themeObject.style.borderColor = 'black';
    innerCircle.style.borderColor = 'black';
    innerCircle.style.backgroundColor = 'black';
}

function menuMouseOver(){
    var menuDot1 = document.getElementById('menuDot1');
    var menuDot2 = document.getElementById('menuDot2');
    var menuDot3 = document.getElementById('menuDot3');
    menuObject.style.borderColor = '#D44CF0';
    menuObject.style.backgroundColor = 'black';
    menuDot1.style.borderColor = 'white';
    menuDot1.style.backgroundColor = 'white';
    menuDot2.style.borderColor = 'white';
    menuDot2.style.backgroundColor = 'white';
    menuDot3.style.borderColor = 'white';
    menuDot3.style.backgroundColor = 'white';
}

function menuMouseOut(){
    var menuDot1 = document.getElementById('menuDot1');
    var menuDot2 = document.getElementById('menuDot2');
    var menuDot3 = document.getElementById('menuDot3');
    menuObject.style.borderColor = 'black';
    menuObject.style.backgroundColor = 'white';
    menuDot1.style.borderColor = 'black';
    menuDot1.style.backgroundColor = 'black';
    menuDot2.style.borderColor = 'black';
    menuDot2.style.backgroundColor = 'black';
    menuDot3.style.borderColor = 'black';
    menuDot3.style.backgroundColor = 'black';
}

function walletMouseOver(){
    var walletText = document.getElementById('walletText');
    walletText.style.color = 'white';
    walletConnector.style.borderColor = '#D44CF0';
    walletConnector.style.backgroundColor = 'black';
}

function walletMouseOut(){
    var walletText = document.getElementById('walletText');
    walletText.style.color = 'black';
    walletConnector.style.borderColor = 'black';
    walletConnector.style.backgroundColor = 'white';
}

function playMouseOver(){
    playButton.style.color = 'white';
    playButton.style.borderColor = '#D44CF0';
    playButton.style.backgroundColor = 'black';
}

function playMouseOut(){
    playButton.style.color = 'black';
    playButton.style.borderColor = 'black';
    playButton.style.backgroundColor = 'white';
}

function gamesPlayedMouseOver(){
    gamesPlayedButton.style.color = 'white';
    gamesPlayedButton.style.borderColor = '#D44CF0';
    gamesPlayedButton.style.backgroundColor = 'black';
}

function gamesPlayedMouseOut(){
    gamesPlayedButton.style.color = 'black';
    gamesPlayedButton.style.borderColor = 'black';
    gamesPlayedButton.style.backgroundColor = 'white';
}

function connectedWalletMouseOver(){
    var account = document.getElementById("account");
    account.style.color = 'white';
    connectedWallet.style.borderColor = '#D44CF0';
    connectedWallet.style.backgroundColor = 'black';
}

function connectedWalletMouseOut(){
    var account = document.getElementById("account");
    account.style.color = 'black';
    connectedWallet.style.borderColor = 'black';
    connectedWallet.style.backgroundColor = 'white';
}

function depositMouseOver(){
    var depositText = document.getElementById("depositText");
    depositText.style.color = 'white';
    depositButton.style.borderColor = '#D44CF0';
    depositButton.style.backgroundColor = 'black';
}

function depositMouseOut(){
    var depositText = document.getElementById("depositText");
    depositText.style.color = 'black';
    depositButton.style.borderColor = 'black';
    depositButton.style.backgroundColor = 'white';
}

function betsMouseOver(){
    var betsText = document.getElementById("betsText");
    betsText.style.color = 'white';
    balanceToBets.style.borderColor = '#D44CF0';
    balanceToBets.style.backgroundColor = 'black';
}

function betsMouseOut(){
    var betsText = document.getElementById("betsText");
    betsText.style.color = 'black';
    balanceToBets.style.borderColor = 'black';
    balanceToBets.style.backgroundColor = 'white';
}

function actionDepositMouseOver(){
    var actionDepositText = document.getElementById("actionDepositText");
    actionDepositText.style.color = 'white';
    actionDepositButton.style.borderColor = '#D44CF0';
    actionDepositButton.style.backgroundColor = 'black';
}

function actionDepositMouseOut(){
    var actionDepositText = document.getElementById("actionDepositText");
    actionDepositText.style.color = 'black';
    actionDepositButton.style.borderColor = 'black';
    actionDepositButton.style.backgroundColor = 'white';
}

//actionBetsMouseOut

function actionBetsMouseOver(){
    var actionBetsText = document.getElementById("actionBetsText");
    actionBetsText.style.color = 'white';
    actionBetsButton.style.borderColor = '#D44CF0';
    actionBetsButton.style.backgroundColor = 'black';
}

function actionBetsMouseOut(){
    var actionBetsText = document.getElementById("actionBetsText");
    actionBetsText.style.color = 'black';
    actionBetsButton.style.borderColor = 'black';
    actionBetsButton.style.backgroundColor = 'white';
}

//click functions

function toBetsClicked(){
    document.getElementById("popUpBoxBets").style.display = 'block';
    tint.style.display = 'block';
    document.getElementById("info").style.display = 'none';
    document.getElementById("gptable-container").style.display = 'none';
}

function depositButtonClicked(){
    document.getElementById('tint').style.display = 'block';
    document.getElementById("popUpBoxDeposit").style.display = 'block';
    document.getElementById("info").style.display = 'none';
    document.getElementById("gptable-container").style.display = 'none';
}

function menuClicked(){
    if(isMenuActive){
        var menu = document.getElementById("menu");
        menu.style.display = 'none';
        isMenuActive = false;
    } else{
        var menu = document.getElementById("menu");
        menu.style.display = 'block';
        isMenuActive = true;
    }

}

function exitClicked(){
    var tint = document.getElementById('tint');
    tint.style.display = 'none';
    document.getElementById("popUpBoxDeposit").style.display = 'none';
    document.getElementById("popUpBoxBets").style.display = 'none';
}

function gamesPlayedClicked(){
    document.getElementById("gptable-container").style.display = 'block';
    document.getElementById("tint").style.display = 'block';
    document.getElementById("info").style.display = 'none';
}

//event listener to close menu.
window.addEventListener('click', function(event){
    if(event.target != menuObject){
        closeMenu();
    }
})

window.addEventListener('click', function(e){
    switch(e.target){
        case infoItem:
            document.getElementById("info").style.display = "grid";
            document.getElementById("tint").style.display = 'block';
            document.getElementById("gptable-container").style.display = 'none';
            document.getElementById("popUpBoxDeposit").style.display = 'none';
            document.getElementById("popUpBoxBets").style.display = 'none';
            closeMenu();
            break;
        case gamesPlayedItem:
            document.getElementById("gptable-container").style.display = 'block';
            document.getElementById("tint").style.display = 'block';
            document.getElementById("info").style.display = 'none';
            document.getElementById("popUpBoxDeposit").style.display = 'none';
            document.getElementById("popUpBoxBets").style.display = 'none';
            closeMenu();
            break;
    }
})


function closeMenu(){
    var menu = document.getElementById("menu");
    menu.style.display = 'none';
    isMenuActive = false;
}

//table setup
var No = [1,2,3,4,5,6,7,8,9,10];
var gameIds = [001,002,003,004,005,006,007,8,9,10];
var table_guesses = [23,34,54,21,26,21,23,14,52,95];
var winning_Numbers = [23,78,65,21,85,42,15,14,63,24];
var table_bets = [2,2,1,1,4,2,5,3,6,7];
var table_rewards = [4,4,2,2,8,4,10,6,12,14];
var table_claims = [false,false,false,true,false,false,false,false,false,true];


    var i = 0;
    var len = No.length;
    var offRow = document.createElement("tr");
    for(;i<len;i++){

        //claim button
        var claimButton = document.createElement("button");
        claimButton.innerText = "Claim";
        claimButton.style.backgroundColor = 'dodgerblue';
        claimButton.style.borderRadius ='10px';
        claimButton.style.width = '100px';
        claimButton.style.borderWidth = '2px';
        claimButton.style.border = 'none';
        claimButton.style.color ='black';
        claimButton.style.margin = '20px';
        claimButton.style.padding = '20px';
    
        var newTable = document.getElementById("newTable");
        var newRow = document.createElement("tr");
        var noCell = document.createElement("td");
        var gameIdCell = document.createElement("td");
        var guessCell = document.createElement("td");
        var winningNumberCell = document.createElement("td");
        var betCell = document.createElement("td");
        var rewardCell = document.createElement("td");
        var claimedCell = document.createElement("td");

        noCell.innerHTML = No[i];     
        gameIdCell.innerHTML = gameIds[i];
        claimButton.value = gameIds[i];
        guessCell.innerHTML = table_guesses[i];
        winningNumberCell.innerHTML = winning_Numbers[i];
        betCell.innerHTML = table_bets[i];
        rewardCell.innerHTML = table_rewards[i];
        claimedCell.innerHTML = table_claims[i];

        newRow.appendChild(noCell);
        newRow.appendChild(gameIdCell);
        newRow.appendChild(guessCell);
        newRow.appendChild(winningNumberCell);
        newRow.appendChild(betCell);
        newRow.appendChild(rewardCell);
        newRow.appendChild(claimedCell);
        if(table_guesses[i] == winning_Numbers[i] && table_claims[i] == true || table_guesses[i] != winning_Numbers[i]){
            claimButton.disabled = true;
            claimButton.style.backgroundColor = 'dimgrey';
            claimButton.style.color ='grey';
        }
        newRow.appendChild(claimButton);
        newTable.appendChild(newRow);
    }


