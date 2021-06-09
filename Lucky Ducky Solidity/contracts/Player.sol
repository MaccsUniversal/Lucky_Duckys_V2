pragma solidity >=0.6.2 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

contract Player {

  // A struct type that defines state variables of a player.
  struct Player{
      address payable wallet;
      uint playerId;
      uint balance;
      uint placedBets;
      uint winRatio;
      bool isPlayer;
  }

  uint internal playerCount;

  //M A P P I N G S
  mapping (address => Player) public player;

  //E V E N T S 
  event NewPlayer(address indexed player, uint indexed playerId);
  
  constructor() public {}

  /// @notice Join as a new player by adding a new record to the players mapping.
  /// @dev Not sure we actually need the playerCount state variable or the struct variable playerId.
  function newPlayer() internal{
    player[msg.sender] = Player(msg.sender, playerCount, 0, 0, 0, true);
    emit NewPlayer(msg.sender,playerCount);
    playerCount++;
  }

}