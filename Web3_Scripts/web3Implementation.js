var accounts;
var account;
var guessingGame;

Web3 = require('web3');

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (MetaMask etc)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
        //   loadOff();
      web3js = new Web3(web3.currentProvider);
      getAccount();
      startApp();
    } else {
    //   getMetaMask();
    //       loadOff();
    }
})

function startApp(){
  guessingGame = new web3js.eth.Contract(gg_abi,gg_address);
}

//Connect to Wallet Button
const walletConnection = document.getElementById('walletConnector')

walletConnection.addEventListener('click', () =>{
	getAccount();
  get_ethBalance();
});

//request access to wallet and display address in addressInput field
//if granted access.
async function getAccount(){
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  get_ethBalance();
  get_playerBets();
  const balance = await web3js.eth.getBalance(accounts[0]);
  const bal = await web3js.utils.fromWei(balance);
  if(accounts.length != 0){
    document.getElementById("account").innerText = account;
    document.getElementById("ethCounter").innerText = bal + " Ξ";
    loadChainId();
    document.getElementById("walletConnector").style.display = 'none';
    document.getElementById("chainId").style.display = 'block';
    document.getElementById("connectedWallet").style.display = 'block';
    document.getElementById("depositButton").style.display = 'block';
    document.getElementById("balanceToBets").style.display = 'block';
  }
}

ethereum.on('accountsChanged', (accounts) => {
  if(accounts.length === 0){
    document.getElementById("connectedWallet").style.display = 'none';
    document.getElementById("depositButton").style.display = 'none';
    document.getElementById("balanceToBets").style.display = 'none';
    document.getElementById("chainId").style.display = 'none';
    document.getElementById("walletConnector").style.display = 'block';
    document.getElementById("account").innerText = '';
    document.getElementById("ethCounter").innerText = '';
    window.location.reload();
  } else {
    getBal();
    window.location.reload();
  }
})

ethereum.on('chainChanged', (chain) => {
  handleChainChange(chain);
  const indicator = document.getElementById("isLive");
  if(chain == '0x2a'){
    indicator.style.backgroundColor = 'greenyellow';
  } else{
    indicator.style.backgroundColor = 'red';
  }
})

async function handleChainChange(_chainId){
  getBal();
  get_ethBalance();
  get_playerBets();
  const network = document.getElementById("network");
  switch (_chainId) {
    case '0x1':
      network.innerText = "Ethereum";
      break;
    case '0x3':
      network.innerText = "Ropsten";
      break;
    case '0x4':
      network.innerText = "Rinkeby";
      break;
    case '0x5':
      network.innerText = "Goerli";
      break;
    case '0x2a':
      network.innerText = "Kovan";
      break;
    default:
      network.innerText = "Network currently not supported"
      break;
  }
}

async function loadChainId(){
  const _chainId = await ethereum.request({ method: 'eth_chainId' });
  const network = document.getElementById("network");
  const indicator = document.getElementById("isLive");
  switch (_chainId) {
    case '0x1':
      network.innerText = "Ethereum";
      break;
    case '0x3':
      network.innerText = "Ropsten";
      break;
    case '0x4':
      network.innerText = "Rinkeby";
      break;
    case '0x5':
      network.innerText = "Goerli";
      break;
    case '0x2a':
      network.innerText = "Kovan";
      indicator.style.backgroundColor = 'greenyellow';
      break;
    default:
      network.innerText = "Network currently not supported"
      break;
  }
}

async function getBal(){
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  const balance = await web3js.eth.getBalance(accounts[0]);
  const bal = await web3js.utils.fromWei(balance);
  document.getElementById("ethCounter").innerText = bal + " Ξ";
}

async function get_ethBalance(){
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

function get_playerBets(){
  guessingGame.methods.getPlayerBets()
  .call({
      from: account
  }, function(error,result){
      if(!error){
          console.log(result);
          var ethBet = web3js.utils.fromWei(result,'ether');
          eth_bets.innerText = ethBet + " Ξ";
      } else {
          console.log(error);
          eth_bets.innerText = "0.0" + " Ξ";
      }
  })
}