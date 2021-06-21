pragma solidity >=0.6.2 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

//import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./Player.sol";

/**
 * @title determines owner of deployed contract
 * @dev This contract initialises the deploying address as the owner of this contract.
 */
contract Owned{
  address payable public owner;

  constructor() public{
    owner = msg.sender;
  }

  /**
   * @dev Access control Modifier
   */
  modifier onlyOwner() {
    require(msg.sender == owner,
            "Only the owner of this contract can call this function.");
    _;
  }
}


/**
 * @title Determines mortality of  
 * @dev This contract can destroy all extended contracts.
 * @dev onlyOwner modifier restricts access to owner declared in Owned.
 */
contract Mortal is Owned{

  /**
   * @notice destroys and removes contracts from blockchain.
   * @dev restricted to contract owner.
   * @dev all funds deposited to contract will be returned to owner should this be called.
   * @dev plans to implement a countdown to give players time to withdraw funds before contract destruction.
   */
  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}


/**
 * @title Lucky Duckys - a betting platform.
 * @author Maccs Universal.
 * @notice Simple and fun contract created to give users the opportunity to win some Eth.
 * @dev All function calls are currently implemented without side effects.
 */
contract Slot_Machine is Mortal, GamePlayer{


  //S T A T E - V A R I A B L E S

  bool private reEntrancyMutex = false;
  bool private enableDeposits = true;
  bool private enableWithdrawals = true;


  /**
   * @notice Deposit event.
   * @dev Event is triggered when a player makes a deposit 
   * @param _player is the address of new player.
   * @param _Id uint that represents player as a number.
   * @param _amount of ETH deposited to contract.
   */
  event Deposit(address indexed _player, uint indexed _Id, uint indexed _amount);
  
  /**
   * @notice Withdraw event.
   * @dev event triggered by withdrawal of funds from contract.
   * @param _player is the address of new player.
   * @param _Id uint that represents player as a number.
   * @param _amount of ETH withdrawn from contract.
   */
  event Withdraw(address indexed _player, uint indexed _Id, uint indexed _amount);
  
  /**
   * @notice an event for when a bet is placed.
   * @dev event triggered when a player moves funds from their balance to placedBets indicating a bet being raised.
   * @param _player is the address of new player.
   * @param _Id uint that represents player as a number.
   * @param _amount of ETH moved from balance to placedBets.
   */
  event BetPlaced(address indexed _player, uint indexed _Id, uint indexed _amount);
  
  /**
   * @notice an event for when an amount of ETH in bets is moved back to the players balance.
   * @dev event triggered when a player moves funds from their placedBets to balance.
   * @param _player is the address of new player.
   * @param _Id uint that represents player as a number.
   * @param _amount of ETH moved from placedBets to balance.
   */
  event UndoneBets(address indexed _player, uint indexed _Id, uint indexed _amount);
  
  /**
   * @notice event for when withdrawals are disabled/enabled.
   * @dev event triggered when owner disables/enables withdrawals in an emergency.
   * @param _on indicates the circuit breaker is active and withdrawals have been disabled.
   * @param _off indicates the circuit breaker is inactive and withdrawals are enabled.
   */
  event WithdrawalBreaker(bool indexed _on, bool indexed _off);
  
  /**
   * @notice event for when deposits are disabled/enabled.
   * @dev event triggered when owner disables/enables deposits in an emergency.
   * @param _on indicates the circuit breaker is active and deposits have been disabled.
   * @param _off indicates the circuit breaker is inactive and deposits are enabled.
   */
  event DepositBreaker(bool indexed _on, bool indexed _off);
  

  /**
   * @notice restricts access to parts of the game to non-registered players.
   * @dev to ensure only registered players can access specific functions
   */
  modifier onlyPlayer(){
    require(player[msg.sender].isPlayer == true);
    _;
  }
    
  /**
   * @notice stops deposits if active.
   * @dev checks to see if deposit circuit breaker is enabled, in which case the deposit function will not execute.
   */
  modifier depositsEnabled(){
    require(enableDeposits == true);
    _;
  }

  /**
   * @notice stops withdrawals if active.
   * @dev checks to see if withdrawals circuit break is enabled, in which case the withdrawBalance/withdrawAll functions will not execute.
   */
  modifier withdrawalsEnabled(){
    require(enableWithdrawals == true);
    _;
  }

  constructor() public {}

  /**
   * @notice disables/enables deposits.
   * @dev circuit breaker to disable the deposit function. Can only be accessed by contract owner.
   */
  function depositsCircuitBreaker() public onlyOwner(){
    bool _on;
    bool _off;
    enableDeposits = !enableDeposits;
    if(enableDeposits){
      _on = true;
      _off = false;
    } else {
      _on = false;
      _off = true;
    }
    emit DepositBreaker(_on, _off);
  }

  /**
   * @notice disables/enables deposits.
   * @dev circuit breaker to disable the deposit function. Can only be accessed by contract owner.
   */
  function withdrawalCircuitBreaker() public onlyOwner(){
    bool _on;
    bool _off;
    enableWithdrawals = !enableWithdrawals;
    if(enableWithdrawals){
      _on = true;
      _off = false;
    } else {
      _on = false;
      _off = true;
    }
    emit WithdrawalBreaker(_on, _off);
  }

  /**
   * @notice Use this to deposit some ETH to contract, register as a new player and increase your balance.
   * @dev depositsEnabled - whilst enableDeposits is true this function will remain active.
   * @dev if player is already registered only players balance with be increaed.
   */
  function deposit() external payable depositsEnabled(){
    if(!player[msg.sender].isPlayer){
      newPlayer(); 
    }
    player[msg.sender].balance += msg.value;
    emit Deposit(msg.sender,player[msg.sender].playerId,msg.value);
  } 

  /**
   * @notice Use this to withdraw all funds from the contract.
   * @dev Not sure we actually need the playerCount state variable or the struct variable playerId.
   * @dev modifier onlyPlayer allows only active players to call withdrawal methods.
   * @dev modifier withdrawalsEnabled - whilst enableWithdrawals is true this function will remain active. 
   * @param _to is the EOA or Contract funds are to be withdrawn to.
   */
  function withdrawAll(address payable _to) public onlyPlayer() withdrawalsEnabled(){
    uint availableAmount = player[msg.sender].balance + player[msg.sender].placedBets;
    require(availableAmount >= 0, "Cannot process this amount");
    player[msg.sender].balance = 0;
    player[msg.sender].placedBets = 0;
    _to.transfer(availableAmount);
    emit Withdraw(msg.sender, player[msg.sender].playerId, availableAmount);
  } 

  /**
   * @notice Use this to withdraw balance from the contract that corresponds to the value or less than the players balance.
   * @dev Not sure we actually need the playerCount state variable or the struct variable playerId.
   * @dev modifier onlyPlayer allows only active players to call withdrawal methods.
   * @dev modifier withdrawalsEnabled - whilst enableWithdrawals is true this function will remain active. 
   * @param _to is the EOA or Contract funds are to be withdrawn to.
   * @param _withdrawalAmount is the value amount to be withdrawn.
   */
  function withdrawBalance(address payable _to, uint _withdrawalAmount) public onlyPlayer() withdrawalsEnabled(){
    require(!reEntrancyMutex);
    uint availableAmount = player[msg.sender].balance;
    require(availableAmount >= _withdrawalAmount);
    player[msg.sender].balance -= _withdrawalAmount;
    reEntrancyMutex = true;
    _to.transfer(_withdrawalAmount);
    reEntrancyMutex = false;
    emit Withdraw(msg.sender, player[msg.sender].playerId, _withdrawalAmount);
  } 

  /**@notice Use this to place bets.
   * @dev modifier onlyPlayer allows only active players to call this function.
   * @param _amount is the value amount to place a bet with.
   */
  function placeBet(uint _amount) public onlyPlayer() {
    require(player[msg.sender].balance >= _amount);
    player[msg.sender].balance -= _amount;
    player[msg.sender].placedBets += _amount;
    emit BetPlaced(msg.sender, player[msg.sender].playerId, _amount);
  }

  /**
   * @notice Use this to dynamically undo placed bets.
   * @dev modifier onlyPlayer allows only active players to call this function.
   * @param _amount is the value amount to remove from placedBets.
   */
  function undoBet(uint _amount) public onlyPlayer() {
    require(player[msg.sender].placedBets >= _amount);
    player[msg.sender].placedBets -= _amount;
    player[msg.sender].balance += _amount;
    emit UndoneBets(msg.sender, player[msg.sender].playerId, _amount);
  }


  /**
   * @notice current balance of this contract.
   * @dev returns the current ETH balance of this contract.
   * @dev balance will be returned in Wei.
   */
  function getBalance() public view returns(uint) {
    return address(this).balance;
  }
  
  /**
   * @notice current balance of player.
   * @dev will only return balance of registered player.
   * @dev onlyPlayer restricts access to players only.
   * @dev uint will return balance in Wei.
   */
  function getPlayerBalance() public onlyPlayer() view returns(uint){
      return player[msg.sender].balance;
  }
  
  /**
   * @notice current bets raised by player.
   * @dev will only return placedBets of registered player.
   * @dev onlyPlayer restricts access to players only.
   * @dev uint will return bets in Wei.
   */
  function getPlayerBets() public onlyPlayer() view returns(uint){
      return player[msg.sender].placedBets;
  }

  fallback () external payable{}

  receive () external payable{
    require(msg.sender.balance >= msg.value,
          "Insufficient balance to complete transaction.");
  }

}
