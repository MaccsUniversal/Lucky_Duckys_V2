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
var depositInput = document.getElementById("depositInput");
var bTbInput = document.getElementById("bTbInput");
var actionUndoButton = document.getElementById("actionUndoButton");
var yes_withdraw_all_button = document.getElementById("yes-withdraw-all-button");
var no_withdraw_all_button = document.getElementById("no-withdraw-all-button");
var withdraw_balance_button = document.getElementById("withdraw-balance-button");

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
actionUndoButton.onmouseover = function () {actionUndoMouseOver()};
actionUndoButton.onmouseout = function () {actionUndoMouseOut()};
yes_withdraw_all_button.onmouseover = function () {yesWithdrawAllButtonMouseOver()};
yes_withdraw_all_button.onmouseout = function () {yesWithdrawAllButtonMouseOut()};
no_withdraw_all_button.onmouseover = function () {noWithdrawAllButtonMouseOver()};
no_withdraw_all_button.onmouseout = function () {noWithdrawAllButtonMouseOut()};
withdraw_balance_button.onmouseover = function () {withdrawBalanceButtonMouseOver()};
withdraw_balance_button.onmouseout = function () {withdrawBalanceButtonMouseOut()};

//onclick functions
menuObject.onclick = function () {menuClicked()};
exit.onclick = function () {exitClicked()};
balanceToBets.onclick = function () {toBetsClicked()};

function themeMouseOver(){
    if(isLight == false){
        var innerCircle = document.getElementById('innerCircle');
        var outerCircle = document.getElementById('outerCircle');
        outerCircle.style.borderColor = 'black';
        themeObject.style.backgroundColor = 'white';
        themeObject.style.borderColor = '#D44CF0';
        innerCircle.style.borderColor = 'black';
        innerCircle.style.backgroundColor = 'black';
        
    } else {
        var innerCircle = document.getElementById('innerCircle');
        var outerCircle = document.getElementById('outerCircle');
        outerCircle.style.borderColor = 'white';
        themeObject.style.backgroundColor = 'black';
        themeObject.style.borderColor = '#D44CF0';
        innerCircle.style.borderColor = 'white';
        innerCircle.style.backgroundColor = 'white';   
    }


}

function themeMouseOut(){
    if(isLight == false){
        var innerCircle = document.getElementById('innerCircle');
        var outerCircle = document.getElementById('outerCircle');
        outerCircle.style.borderColor = 'white';
        themeObject.style.backgroundColor = 'black';
        themeObject.style.borderColor = 'white';
        innerCircle.style.borderColor = 'white';
        innerCircle.style.backgroundColor = 'white';   
    } else {
        var innerCircle = document.getElementById('innerCircle');
        var outerCircle = document.getElementById('outerCircle');
        outerCircle.style.borderColor = 'black';
        themeObject.style.backgroundColor = 'white';
        themeObject.style.borderColor = 'black';
        innerCircle.style.borderColor = 'black';
        innerCircle.style.backgroundColor = 'black';
    }
}

function menuMouseOver(){
    if(isLight == false){
        var menuDot1 = document.getElementById('menuDot1');
        var menuDot2 = document.getElementById('menuDot2');
        var menuDot3 = document.getElementById('menuDot3');
        menuObject.style.borderColor = '#D44CF0';
        menuObject.style.backgroundColor = 'white';
        menuDot1.style.borderColor = 'black';
        menuDot1.style.backgroundColor = 'black';
        menuDot2.style.borderColor = 'black';
        menuDot2.style.backgroundColor = 'black';
        menuDot3.style.borderColor = 'black';
        menuDot3.style.backgroundColor = 'black';

    } else {
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

}

function menuMouseOut(){
    if(isLight == false){
        var menuDot1 = document.getElementById('menuDot1');
        var menuDot2 = document.getElementById('menuDot2');
        var menuDot3 = document.getElementById('menuDot3');
        menuObject.style.borderColor = 'white';
        menuObject.style.backgroundColor = 'black';
        menuDot1.style.borderColor = 'white';
        menuDot1.style.backgroundColor = 'white';
        menuDot2.style.borderColor = 'white';
        menuDot2.style.backgroundColor = 'white';
        menuDot3.style.borderColor = 'white';
        menuDot3.style.backgroundColor = 'white';
    } else{
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

}

function walletMouseOver(){
    if(isLight == false){
        var walletText = document.getElementById('walletText');
        walletText.style.color = 'black';
        walletConnector.style.borderColor = '#D44CF0';
        walletConnector.style.backgroundColor = 'white';
    } else {
        var walletText = document.getElementById('walletText');
        walletText.style.color = 'white';
        walletConnector.style.borderColor = '#D44CF0';
        walletConnector.style.backgroundColor = 'black';
    }
}

function walletMouseOut(){
    if(isLight == false){
        var walletText = document.getElementById('walletText');
        walletText.style.color = 'white';
        walletConnector.style.borderColor = 'white';
        walletConnector.style.backgroundColor = 'black';
    } else {
        var walletText = document.getElementById('walletText');
        walletText.style.color = 'black';
        walletConnector.style.borderColor = 'black';
        walletConnector.style.backgroundColor = 'white';
    }

}

function playMouseOver(){
    if(isLight == false){
        playButton.style.color = 'black';
        playButton.style.borderColor = '#D44CF0';
        playButton.style.backgroundColor = 'white';
    } else {
        playButton.style.color = 'white';
        playButton.style.borderColor = '#D44CF0';
        playButton.style.backgroundColor = 'black';
    }

}

function playMouseOut(){
    if(isLight == false){
        playButton.style.color = 'white';
        playButton.style.borderColor = 'white';
        playButton.style.backgroundColor = 'black';
    } else {
        playButton.style.color = 'black';
        playButton.style.borderColor = 'black';
        playButton.style.backgroundColor = 'white';
    }
}

function gamesPlayedMouseOver(){
    if(isLight == false){
        gamesPlayedButton.style.color = 'black';
        gamesPlayedButton.style.borderColor = '#D44CF0';
        gamesPlayedButton.style.backgroundColor = 'white';
    } else {
        gamesPlayedButton.style.color = 'white';
        gamesPlayedButton.style.borderColor = '#D44CF0';
        gamesPlayedButton.style.backgroundColor = 'black';
    }
}

function gamesPlayedMouseOut(){
    if(isLight == false){
        gamesPlayedButton.style.color = 'white';
        gamesPlayedButton.style.borderColor = 'white';
        gamesPlayedButton.style.backgroundColor = 'black';
    } else {
        gamesPlayedButton.style.color = 'black';
        gamesPlayedButton.style.borderColor = 'black';
        gamesPlayedButton.style.backgroundColor = 'white';
    }
}

function connectedWalletMouseOver(){
    if(isLight == false){
        var account = document.getElementById("account");
        account.style.color = 'black';
        connectedWallet.style.borderColor = '#D44CF0';
        connectedWallet.style.backgroundColor = 'white';
    } else {
        var account = document.getElementById("account");
        account.style.color = 'white';
        connectedWallet.style.borderColor = '#D44CF0';
        connectedWallet.style.backgroundColor = 'black';
    }

}

function connectedWalletMouseOut(){
    if(isLight == false){
        var account = document.getElementById("account");
        account.style.color = 'white';
        connectedWallet.style.borderColor = 'white';
        connectedWallet.style.backgroundColor = 'black';
    } else {
        var account = document.getElementById("account");
        account.style.color = 'black';
        connectedWallet.style.borderColor = 'black';
        connectedWallet.style.backgroundColor = 'white';
    }

}

function depositMouseOver(){
    if(isLight == false){
        var depositText = document.getElementById("depositText");
        depositText.style.color = 'black';
        depositButton.style.borderColor = '#D44CF0';
        depositButton.style.backgroundColor = 'white';
    } else {
        var depositText = document.getElementById("depositText");
        depositText.style.color = 'white';
        depositButton.style.borderColor = '#D44CF0';
        depositButton.style.backgroundColor = 'black';
    }
}

function depositMouseOut(){
    if(isLight == false){
        var depositText = document.getElementById("depositText");
        depositText.style.color = 'white';
        depositButton.style.borderColor = 'white';
        depositButton.style.backgroundColor = 'black';
    } else {
        var depositText = document.getElementById("depositText");
        depositText.style.color = 'black';
        depositButton.style.borderColor = 'black';
        depositButton.style.backgroundColor = 'white';
    }
}

function betsMouseOver(){
    if(isLight == false){
        var betsText = document.getElementById("betsText");
        betsText.style.color = 'black';
        balanceToBets.style.borderColor = '#D44CF0';
        balanceToBets.style.backgroundColor = 'white';
    } else {
        var betsText = document.getElementById("betsText");
        betsText.style.color = 'white';
        balanceToBets.style.borderColor = '#D44CF0';
        balanceToBets.style.backgroundColor = 'black';
    }
}

function betsMouseOut(){
    if(isLight == false){
        var betsText = document.getElementById("betsText");
        betsText.style.color = 'white';
        balanceToBets.style.borderColor = 'white';
        balanceToBets.style.backgroundColor = 'black';
    } else {
        var betsText = document.getElementById("betsText");
        betsText.style.color = 'black';
        balanceToBets.style.borderColor = 'black';
        balanceToBets.style.backgroundColor = 'white';
    }
}

function actionDepositMouseOver(){
    if(isLight == false){
        var actionDepositText = document.getElementById("actionDepositText");
        actionDepositText.style.color = 'black';
        actionDepositButton.style.borderColor = '#D44CF0';
        actionDepositButton.style.backgroundColor = 'white';
    } else {
        var actionDepositText = document.getElementById("actionDepositText");
        actionDepositText.style.color = 'white';
        actionDepositButton.style.borderColor = '#D44CF0';
        actionDepositButton.style.backgroundColor = 'black';
    }
}

function actionDepositMouseOut(){
    if(isLight == false){
        var actionDepositText = document.getElementById("actionDepositText");
        actionDepositText.style.color = 'white';
        actionDepositButton.style.borderColor = 'white';
        actionDepositButton.style.backgroundColor = 'black';
    } else {
        var actionDepositText = document.getElementById("actionDepositText");
        actionDepositText.style.color = 'black';
        actionDepositButton.style.borderColor = 'black';
        actionDepositButton.style.backgroundColor = 'white';
    }

}

//actionBetsMouseOut

function actionBetsMouseOver(){
    if(isLight == false){
        var actionBetsText = document.getElementById("actionBetsText");
        actionBetsText.style.color = 'black';
        actionBetsButton.style.borderColor = '#D44CF0';
        actionBetsButton.style.backgroundColor = 'white';
    } else {
        var actionBetsText = document.getElementById("actionBetsText");
        actionBetsText.style.color = 'white';
        actionBetsButton.style.borderColor = '#D44CF0';
        actionBetsButton.style.backgroundColor = 'black';
    }

}

function actionBetsMouseOut(){
    if(isLight == false){
        var actionBetsText = document.getElementById("actionBetsText");
        actionBetsText.style.color = 'white';
        actionBetsButton.style.borderColor = 'white';
        actionBetsButton.style.backgroundColor = 'black';
    } else {
        var actionBetsText = document.getElementById("actionBetsText");
        actionBetsText.style.color = 'black';
        actionBetsButton.style.borderColor = 'black';
        actionBetsButton.style.backgroundColor = 'white';
    }

}

//action undoBets

function actionUndoMouseOver(){
    if(isLight == false){
        var actionUndoText = document.getElementById("actionUndoText");
        actionUndoText.style.color = 'black';
        actionUndoButton.style.borderColor = '#D44CF0';
        actionUndoButton.style.backgroundColor = 'white';
    } else {
        var actionUndoText = document.getElementById("actionUndoText");
        actionUndoText.style.color = 'white';
        actionUndoButton.style.borderColor = '#D44CF0';
        actionUndoButton.style.backgroundColor = 'black';
    }

}

function actionUndoMouseOut(){
    if(isLight == false){
        var actionUndoText = document.getElementById("actionUndoText");
        actionUndoText.style.color = 'white';
        actionUndoButton.style.borderColor = 'white';
        actionUndoButton.style.backgroundColor = 'black';
    } else {
        var actionUndoText = document.getElementById("actionUndoText");
        actionUndoText.style.color = 'black';
        actionUndoButton.style.borderColor = 'black';
        actionUndoButton.style.backgroundColor = 'white';
    }

}

//withdraw all

function yesWithdrawAllButtonMouseOver(){
    if(isLight == false){
        var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
        yes_action_withdraw_all_text.style.color = 'black';
        yes_withdraw_all_button.style.borderColor = '#D44CF0';
        yes_withdraw_all_button.style.backgroundColor = 'white';
    } else {
        var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
        yes_action_withdraw_all_text.style.color = 'white';
        yes_withdraw_all_button.style.borderColor = '#D44CF0';
        yes_withdraw_all_button.style.backgroundColor = 'black';
    }

}

function yesWithdrawAllButtonMouseOut(){
    if(isLight == false){
        var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
        yes_action_withdraw_all_text.style.color = 'white';
        yes_withdraw_all_button.style.borderColor = 'white';
        yes_withdraw_all_button.style.backgroundColor = 'black';
    } else {
        var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
        yes_action_withdraw_all_text.style.color = 'black';
        yes_withdraw_all_button.style.borderColor = 'black';
        yes_withdraw_all_button.style.backgroundColor = 'white';
    }
}

function noWithdrawAllButtonMouseOver(){
    if(isLight == false){
        var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
        no_action_withdraw_all_text.style.color = 'black';
        no_withdraw_all_button.style.borderColor = '#D44CF0';
        no_withdraw_all_button.style.backgroundColor = 'white';
    } else {
        var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
        no_action_withdraw_all_text.style.color = 'white';
        no_withdraw_all_button.style.borderColor = '#D44CF0';
        no_withdraw_all_button.style.backgroundColor = 'black';
    }

}

function noWithdrawAllButtonMouseOut(){
    if(isLight == false){
        var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
        no_action_withdraw_all_text.style.color = 'white';
        no_withdraw_all_button.style.borderColor = 'white';
        no_withdraw_all_button.style.backgroundColor = 'black';
    } else {
        var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
        no_action_withdraw_all_text.style.color = 'black';
        no_withdraw_all_button.style.borderColor = 'black';
        no_withdraw_all_button.style.backgroundColor = 'white';
    }
}

//withdraw balance

function withdrawBalanceButtonMouseOver(){
    if(isLight == false){
        var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
        action_withdraw_balance_text.style.color = 'black';
        withdraw_balance_button.style.borderColor = '#D44CF0';
        withdraw_balance_button.style.backgroundColor = 'white';
    } else {
        var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
        action_withdraw_balance_text.style.color = 'white';
        withdraw_balance_button.style.borderColor = '#D44CF0';
        withdraw_balance_button.style.backgroundColor = 'black';
    }

}

function withdrawBalanceButtonMouseOut(){
    if(isLight == false){
        var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
        action_withdraw_balance_text.style.color = 'white';
        withdraw_balance_button.style.borderColor = 'white';
        withdraw_balance_button.style.backgroundColor = 'black';
    } else {
        var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
        action_withdraw_balance_text.style.color = 'black';
        withdraw_balance_button.style.borderColor = 'black';
        withdraw_balance_button.style.backgroundColor = 'white';
    }
}

//click functions

function toBetsClicked(){
    document.getElementById("popUpBoxBets").style.display = 'block';
    tint.style.display = 'block';
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
    depositInput.value = '';
    bTbInput.value = '';
    document.getElementById("popUpBoxDeposit").style.display = 'none';
    document.getElementById("popUpBoxBets").style.display = 'none';
    document.getElementById("checkButton").style.display = 'none';
    document.getElementById("gptable-container").style.display = 'none';
    document.getElementById("results").style.display = 'none';
    document.getElementById("resultText").style.display = 'none';
    document.getElementById("popUpBox-withdraw-balance").style.display = 'none';
    document.getElementById("popUpBoxUndo").style.display = 'none';
    document.getElementById("popUpBox-withdraw-all").style.display = 'none';
}

function removeRows(){
    while(document.getElementById("newRow")){
        document.getElementById("newTable").removeChild(document.getElementById("newRow"));
    }
}

//event listener to close menu.
window.addEventListener('click', function(event){
    if(event.target != menuObject){
        closeMenu();
    }
})

window.addEventListener('click', async function(e){
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
            removeRows();
            gamesPlayedClicked();
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