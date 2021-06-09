pragma solidity >=0.6.2 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

//import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./Player.sol";

//This contract sets the owner
contract Owned{
  address payable public owner;

  constructor() public{
    owner = msg.sender;
  }

  //Access control Modifier
  modifier onlyOwner() {
    require(msg.sender == owner,
            "Only the owner of this contract can call this function.");
    _;
  }
}

contract Mortal is Owned{

  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}


/// @title Lucky Duckys - a betting platform 
/// @author Maccs Universal
/// @notice Simple and fun contract created to give users the opportunity to win some Eth.
/// @dev All function calls are currently implemented without side effects
contract Slot_Machine is Mortal, gamePlayer{


  //S T A T E - V A R I A B L E S

  bool reEntrancyMutex = false;
  bool enableDeposits = true;
  bool enableWithdrawals = true;

  //The random number returned from the generator.
  uint randomNumber;

  //E V E N T S 
  event Deposit(address indexed player, uint indexed Id, uint indexed amount);
  event Withdraw(address indexed player, uint indexed Id, uint indexed amount);
  event BetPlaced(address indexed player, uint indexed Id, uint indexed amount);
  event UndoneBets(address indexed player, uint indexed Id, uint indexed amount);
  event WithdrawalBreaker(bool indexed on, bool indexed off);
  event DepositBreaker(bool indexed on, bool indexed off);
  event MyGuess(address indexed from, uint myguess);
  event Message(address indexed from, string  message, uint guess, uint random_number, uint  deposit, uint  winnings);

  // M O D I F I E R S
  modifier onlyPlayer(){
    require(player[msg.sender].isPlayer == true);
    _;
  }

  modifier depositsEnabled(){
    require(enableDeposits == true);
    _;

  }

  modifier withdrawalsEnabled(){
    require(enableWithdrawals == true);
    _;
  }

  constructor() public {}

  /// @dev circuit breaker to disable the deposit function.
  function depositsCircuitBreaker() public onlyOwner(){
    bool _on;
    bool _off;
    enableDeposits = !enableDeposits;
    if(enableWithdrawals){
      _on = true;
      _off = false;
    } else {
      _on = false;
      _off = true;
    }
    emit DepositBreaker(_on, _off);
  }

  /// @dev circuit breaker to disable the withdraw function.
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

  /// @notice Use this to deposit some ETH to contract and increase your balance.
  /// @dev depositsEnabled - whilst enableDeposits is true this function will remain active.
  function deposit() external payable depositsEnabled(){
    if(!player[msg.sender].isPlayer){
      newPlayer(); 
    }
    player[msg.sender].balance += msg.value;
    emit Deposit(msg.sender,player[msg.sender].playerId,msg.value);
  } 

  /// @notice Use this to deposit some ETH to contract and increase your balance.
  /// @dev depositsEnabled - whilst enableDeposits is true this function will remain active.
  function depositAmount(uint32 amount) public depositsEnabled(){
    if(!player[msg.sender].isPlayer){
      newPlayer(); 
    }
    player[msg.sender].balance += amount;
    emit Deposit(msg.sender,player[msg.sender].playerId,amount);
  } 

  /// @notice Use this to withdraw all funds from the contract..
  /// @dev Not sure we actually need the playerCount state variable or the struct variable playerId.
  /// @dev modifier onlyPlayer allows only active players to call withdrawal methods.
  /// @dev modifier withdrawalsEnabled - whilst enableWithdrawals is true this function will remain active. 
  /// @param _to is the EOA or Contract funds are to be withdrawn to.
  function withdrawAll(address payable _to) public onlyPlayer() withdrawalsEnabled(){
    uint availableAmount = player[msg.sender].balance + player[msg.sender].placedBets;
    require(availableAmount >= 0);
    player[msg.sender].balance = 0;
    player[msg.sender].placedBets = 0;
    _to.transfer(availableAmount* 1 wei);
    emit Withdraw(msg.sender, player[msg.sender].playerId, availableAmount);
  } 

  /// @notice Use this to withdraw balance from the contract that correspond to the value or less than the players balance.
  /// @dev Not sure we actually need the playerCount state variable or the struct variable playerId.
  /// @dev modifier onlyPlayer allows only active players to call withdrawal methods.
  /// @dev modifier withdrawalsEnabled - whilst enableWithdrawals is true this function will remain active. 
  /// @param _to is the EOA or Contract funds are to be withdrawn to.
  /// @param _withdrawalAmount is the value amount to be withdrawn.
  function withdrawBalance(address payable _to, uint _withdrawalAmount) public onlyPlayer() withdrawalsEnabled(){
    uint availableAmount = player[msg.sender].balance;
    require(availableAmount >= _withdrawalAmount);
    player[msg.sender].balance -= _withdrawalAmount;
    _to.transfer(_withdrawalAmount);
    emit Withdraw(msg.sender, player[msg.sender].playerId, _withdrawalAmount);
  } 

  /// @notice Use this to place bets.
  /// @dev modifier onlyPlayer allows only active players to call this function.
  /// @param amount is the value amount to place a bet with.
  function placeBet(uint amount) public onlyPlayer() {
    require(player[msg.sender].balance >= amount);
    player[msg.sender].balance -= amount;
    player[msg.sender].placedBets += amount;
    emit BetPlaced(msg.sender, player[msg.sender].playerId, amount);
  }

  /// @notice Use this to dynamically undo placed bets.
  /// @dev modifier onlyPlayer allows only active players to call this function.
  /// @param amount is the value amount to remove from placedBets.
  function undoBet(uint amount) public onlyPlayer() {
    require(player[msg.sender].placedBets >= amount);
    player[msg.sender].placedBets -= amount;
    player[msg.sender].balance += amount;
    emit UndoneBets(msg.sender, player[msg.sender].playerId, amount);
  }

//   / @notice Use this to dynamically undo placed bets.
//   / @dev modifier onlyPlayer allows only active players to call this function.
//   / @param _userProvidedSeed is the value amount to remove from placedBets.
//   function randomGen(uint256 _userProvidedSeed) public returns(uint256) {
//     getRandomNumber(_userProvidedSeed);
//     return randomResult;
//   }
  
//   function getRandomNumber() public view returns(uint256) {
//       return randomResult;
//   }

  //Pay out double the players deposit if they guess correctly the randomly generated number.
  function getBalance() public view returns(uint) {
    return address(this).balance;
  }

  fallback () external payable{}

  receive () external payable{
    require(msg.sender.balance >= msg.value,
          "Insufficient balance to complete transaction.");
  }

}
