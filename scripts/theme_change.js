var themed = document.getElementById("themed");
var jsTheme = document.getElementById("theme_change");

var isLight = false;

themeObject.onclick = function () {themeObjectClicked();}

function themeObjectClicked(){
    if(isLight == false){
        themed.href = './sheets/inverted_theme.css';
        lightsOn();
        isLight = true;
    } else if(isLight == true){
        themed.href = './sheets/ld_style.css';
        lightOff();
        isLight = false;
    }
}

function lightsOn(){
    var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
    yes_action_withdraw_all_text.style.color = 'black';
    yes_withdraw_all_button.style.borderColor = 'black';
    yes_withdraw_all_button.style.backgroundColor = 'white';
    var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
    no_action_withdraw_all_text.style.color = 'black';
    no_withdraw_all_button.style.borderColor = 'black';
    no_withdraw_all_button.style.backgroundColor = 'white';
    var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
    action_withdraw_balance_text.style.color = 'black';
    withdraw_balance_button.style.borderColor = 'black';
    withdraw_balance_button.style.backgroundColor = 'white';
    document.getElementById("slidingMenuCaret").style.color = 'black';
    undoBet.style.color = 'black';
    undoBet.style.borderColor = 'black';
    undoBet.style.backgroundColor = 'white';
    withdrawAll.style.color = 'black';
    withdrawAll.style.borderColor = 'black';
    withdrawAll.style.backgroundColor = 'white';
    withdrawBalance.style.color = 'black';
    withdrawBalance.style.borderColor = 'black';
    withdrawBalance.style.backgroundColor = 'white';
    var innerCircle = document.getElementById('innerCircle');
    var outerCircle = document.getElementById('outerCircle');
    outerCircle.style.borderColor = 'black';
    themeObject.style.backgroundColor = 'white';
    themeObject.style.borderColor = 'black';
    innerCircle.style.borderColor = 'black';
    innerCircle.style.backgroundColor = 'black';
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
    var walletText = document.getElementById('walletText');
    walletText.style.color = 'black';
    walletConnector.style.borderColor = 'black';
    walletConnector.style.backgroundColor = 'white'; 
    playButton.style.color = 'black';
    playButton.style.borderColor = 'black';
    playButton.style.backgroundColor = 'white';
    gamesPlayedButton.style.color = 'black';
    gamesPlayedButton.style.borderColor = 'black';
    gamesPlayedButton.style.backgroundColor = 'white';
    var account = document.getElementById("account");
    account.style.color = 'black';
    connectedWallet.style.borderColor = 'black';
    connectedWallet.style.backgroundColor = 'white';
    var depositText = document.getElementById("depositText");
    depositText.style.color = 'black';
    depositButton.style.borderColor = 'black';
    depositButton.style.backgroundColor = 'white';
    var betsText = document.getElementById("betsText");
    betsText.style.color = 'black';
    balanceToBets.style.borderColor = 'black';
    balanceToBets.style.backgroundColor = 'white';
    var actionDepositText = document.getElementById("actionDepositText");
    actionDepositText.style.color = 'black';
    actionDepositButton.style.borderColor = 'black';
    actionDepositButton.style.backgroundColor = 'white';
    var actionBetsText = document.getElementById("actionBetsText");
    actionBetsText.style.color = 'black';
    actionBetsButton.style.borderColor = 'black';
    actionBetsButton.style.backgroundColor = 'white';
}

function lightOff(){
    var yes_action_withdraw_all_text = document.getElementById("yes-action-withdraw-all-text");
    yes_action_withdraw_all_text.style.color = 'white';
    yes_withdraw_all_button.style.borderColor = 'white';
    yes_withdraw_all_button.style.backgroundColor = 'black';
    var no_action_withdraw_all_text = document.getElementById("no-action-withdraw-all-text");
    no_action_withdraw_all_text.style.color = 'white';
    no_withdraw_all_button.style.borderColor = 'white';
    no_withdraw_all_button.style.backgroundColor = 'black';
    var action_withdraw_balance_text = document.getElementById("action-withdraw-balance-text");
    action_withdraw_balance_text.style.color = 'white';
    withdraw_balance_button.style.borderColor = 'white';
    withdraw_balance_button.style.backgroundColor = 'black';
    document.getElementById("slidingMenuCaret").style.color = 'white';
    withdrawBalance.style.color = 'white';
    withdrawBalance.style.borderColor = 'white';
    withdrawBalance.style.backgroundColor = 'black';
    withdrawAll.style.color = 'white';
    withdrawAll.style.borderColor = 'white';
    withdrawAll.style.backgroundColor = 'black';
    undoBet.style.color = 'white';
    undoBet.style.borderColor = 'white';
    undoBet.style.backgroundColor = 'black';
    var innerCircle = document.getElementById('innerCircle');
    var outerCircle = document.getElementById('outerCircle');
    outerCircle.style.borderColor = 'white';
    themeObject.style.backgroundColor = 'black';
    themeObject.style.borderColor = 'white';
    innerCircle.style.borderColor = 'white';
    innerCircle.style.backgroundColor = 'white';
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
    var walletText = document.getElementById('walletText');
    walletText.style.color = 'white';
    walletConnector.style.borderColor = 'white';
    walletConnector.style.backgroundColor = 'black';
    playButton.style.color = 'white';
    playButton.style.borderColor = 'white';
    playButton.style.backgroundColor = 'black';
    gamesPlayedButton.style.color = 'white';
    gamesPlayedButton.style.borderColor = 'white';
    gamesPlayedButton.style.backgroundColor = 'black';
    var account = document.getElementById("account");
    account.style.color = 'white';
    connectedWallet.style.borderColor = 'white';
    connectedWallet.style.backgroundColor = 'black';
    var depositText = document.getElementById("depositText");
    depositText.style.color = 'white';
    depositButton.style.borderColor = 'white';
    depositButton.style.backgroundColor = 'black';
    var betsText = document.getElementById("betsText");
    betsText.style.color = 'white';
    balanceToBets.style.borderColor = 'white';
    balanceToBets.style.backgroundColor = 'black';
    var actionDepositText = document.getElementById("actionDepositText");
    actionDepositText.style.color = 'white';
    actionDepositButton.style.borderColor = 'white';
    actionDepositButton.style.backgroundColor = 'black';
    var actionBetsText = document.getElementById("actionBetsText");
    actionBetsText.style.color = 'white';
    actionBetsButton.style.borderColor = 'white';
    actionBetsButton.style.backgroundColor = 'black';
}

