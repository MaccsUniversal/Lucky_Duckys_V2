pragma solidity >=0.6.2 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

/**
 * @title Player Registry contract.
 * @author Macccs Universal
 * @notice This contract contains the criteria that makes up a new player
 * and outlines how new players are initiated and stored.
 * @dev All function calls are currently implemented without side effects.
 */

contract GamePlayer {

  // A struct type that defines state variables of a player.
  struct Player{
      address payable wallet;
      uint playerId;
      uint balance;
      uint placedBets;
      bool isPlayer;
  }

  uint internal playerCount;

  /**
   * @notice map/list of player addresses.
   */
  mapping (address => Player) public player;

  /**
   * @notice new player event.
   * @dev Event is triggered by the regisration of a new player. 
   * @param _player is the address of new player.
   * @param _playerId uint that represents player as a number.
   */
  event NewPlayer(address indexed _player, uint indexed _playerId);
  
  constructor() public {}

  /**@notice creates and registers a new player.
   * @dev Not sure we actually need the the struct variable playerId
   * but I've included it for future reference.
   */
  function newPlayer() internal{
    require(player[msg.sender].isPlayer == false, 'address already registered as player');
    player[msg.sender] = Player(msg.sender, playerCount, 0, 0, true);
    emit NewPlayer(msg.sender,playerCount);
    playerCount++;
  }

}

contract TestPlayer is GamePlayer{

  uint public _playerCount;
  bool public _registeredPlayer;
  constructor () public {
    _playerCount = 0;
    _registeredPlayer = false;

  }
  function _newPlayer() public{
    if(player[msg.sender].isPlayer == false){
      player[msg.sender] = Player(msg.sender, playerCount, 0, 0, true);
      emit NewPlayer(msg.sender,playerCount);
      _playerCount++;
    } else {
      _registeredPlayer = true;
    }
  }

  function getCounter() public view returns(uint){
    return _playerCount;
  }

    function isPlayer() public view returns(bool){
    return _registeredPlayer;
  }
}