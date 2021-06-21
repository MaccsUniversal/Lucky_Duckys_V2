pragma solidity >=0.6.0 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

//import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./Slot_Machine.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

/**
 * @title Guessing Game contract.
 * @author Macccs Universal
 * @notice have a guess at the random number to be retuned, if you're right you win double the money you've bet on your guess.
 * @dev extension of Slot_machine contract.
 * @dev All function calls are currently implemented without side effects.
 * @dev Constructor inherits VRFConsumerBase
 * @dev Network: Kovan
 * @dev LINK token address: 0xa36085f69e2889c224210f603d836748e7dc0088
 * @dev Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
 * @dev Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
 * @dev Fee: 100000000000000000
 */

contract GuessingGame is Slot_Machine, VRFConsumerBase{
    
    //S T R U C T
    struct GameLog{
        uint gameId;
        uint256 playerGuess;
        uint256 winningNumber;
        uint betPlaced;
        uint reward;
        uint32 gamesPlayed;
        bool winner;
        bool claimed;
    }
    

    // S T A T E  V A R I A B L E
    address private playerAddress;
    uint32  private counter;
    uint private bettingAmount;
    bool private cWinnerMutex;
    bool private playing;
    bytes32 internal keyHash;
    uint256 internal fee;
    
    /**
     * @dev uint256 random number returned from chainlink VRF contract.
     */
    uint256 public randomResult;
    
    
    //M A P P I N G
    mapping (address => mapping (uint => GameLog)) public gamesLog;  //tracks player interaction and game results.
    mapping (address => uint32) public playCounter; //counts how many times the game has been played.

    // E V E N T S

  /**
   * @notice event for when players guess is confirmed.
   * @dev event triggered after guess and betting amount have been set in the game log.
   * @param _player address the guess is coming from.
   * @param _guess made by sending address.
   */
    event Guess(address indexed _player, uint indexed _guess);
    
  /**
   * @notice event for the game results.
   * @dev event triggered random number has been returned and compared with guess.
   * @param _player address currently playing.
   * @param _winner is this player a winner true or false.
   * @param _guess made by playing address. 
   * @param _winningNo random number returned by VRF contract.
   */
    event Result(address indexed _player, bool indexed _winner, uint indexed _guess, uint _winningNo);
    
  /**
   * @notice event for rewards claimed.
   * @dev event triggered when rewards are claimed.
   * @param _player address currently playing.
   * @param _rewardClaimed has the reward been claimed?
   * @param _newBalance updated player balance after reward is claimed. 
   */
    event RewardClaimed(address indexed _player, uint indexed _rewardClaimed, uint indexed _newBalance);
    
  /**
   * @dev event triggered when random number is about to be requested.
   * @param _requestId.
   */
    event RequestedRandomness(bytes32 _requestId);

    constructor(address _linkTokenAddress, bytes32 _keyHash, 
    address _vrfCoordinatorAddress, uint256 _fee) 
    public 
    VRFConsumerBase( 
        _vrfCoordinatorAddress,
        _linkTokenAddress
        )  
        {
            keyHash = _keyHash;
            fee = _fee;
        }

  /**
   * @notice LINK token balance of this contract.
   * @dev LINK is required to make random number requests.
   * @dev Contract must have a balance of at least 0.1 LINK
   * @return LINK balance of contract.
   */
    function getLinkBalance() public view returns(uint){
        return LINK.balanceOf(address(this));
    }
    
    /**
     * @notice use this function to claim all available rewards.
     * @dev can only be called by registered players.
     * @dev loops through number of times the sending address has played.
     * @dev not implemented on UI.
     */
    // function claimAllRewards() public onlyPlayer(){
    //     //return array of mapping and all rewards are stored in a totalRewards variable.
    //     //totalRewards are then added to players balance.
    //     uint totalRewards;
        
    //     for(uint256 i = 0; i < playCounter[msg.sender]; i++) {
    //         require(gamesLog[msg.sender][i].playerGuess == gamesLog[msg.sender][i].winningNumber);
    //         require(gamesLog[msg.sender][i].claimed == false);
    //         totalRewards = totalRewards + gamesLog[msg.sender][i].reward;
    //         gamesLog[msg.sender][i].claimed = true;
    //         player[msg.sender].balance += totalRewards;
    //     }
    // }
    
    /**
     * @notice use this function to claim a reward.
     * @dev can only be called by registered players
     * @param _gameId uint representing sending addresses gameId in games log.
     * @param _counter uint pointing to the index of the game where rewards can be claimed.
     */
    function claimReward(uint _gameId, uint _counter) public onlyPlayer(){
        require(_gameId == gamesLog[msg.sender][_counter].gameId);
        require(gamesLog[msg.sender][_counter].playerGuess == gamesLog[msg.sender][_counter].winningNumber);
        require(gamesLog[msg.sender][_counter].claimed == false);
        gamesLog[msg.sender][_counter].claimed = true;
        player[msg.sender].balance += gamesLog[msg.sender][_counter].reward;
        emit RewardClaimed(msg.sender, gamesLog[msg.sender][_counter].reward, player[msg.sender].balance);
    }


    /**
     * @notice results for last game played.
     * @dev can only be called by registered players.
     * @return game Id, guess, winning number, bet and reward of the current game. 
     */  
    function getResult() 
    public 
    onlyPlayer()
    view 
    returns
    (
        uint256[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        uint[] memory,
        uint[] memory
    )
    {
        uint i = playCounter[msg.sender];
        
        uint256 Id = gamesLog[msg.sender][i].gameId;
        uint256 guess = gamesLog[msg.sender][i].playerGuess;
        uint256 winningNo = gamesLog[msg.sender][i].winningNumber;
        uint bet = gamesLog[msg.sender][i].betPlaced;
        uint reward = gamesLog[msg.sender][i].reward;
        
        // Dynamic Array Declarations
        
        uint256[] memory playerGuesses = new uint256[](1);
        uint256[] memory gameIds = new uint256[](1);
        uint256[] memory winningNumbers = new uint256[](1);
        uint[] memory betsPlaced = new uint[](1);
        uint[] memory rewards = new uint[](1);
        //Storing results in arrays
        
        gameIds[0] = Id;
        playerGuesses[0] = guess;
        winningNumbers[0] = winningNo;
        betsPlaced[0] = bet;
        rewards[0] = reward;
        
        return (gameIds, playerGuesses, winningNumbers, betsPlaced, rewards);
    }
    
    /**
     * @notice log of all games played by player.
     * @dev loops through number of games played by address and stores each games variables in an array.
     * @dev can only be called by registered players.
     * @return game Id, guess, winning number, bet, reward and if the rewards have been claimed. 
     */  
    function getLogs() 
    public 
    onlyPlayer()
    view 
    returns 
    (
        uint256[] memory, 
        uint256[] memory, 
        uint256[] memory, 
        uint[] memory,
        uint[] memory,
        bool[] memory
    ) 
    
    {
        uint256[] memory playerGuesses = new uint256[](playCounter[msg.sender]);
        uint256[] memory gameIds = new uint256[](playCounter[msg.sender]);
        uint256[] memory winningNumbers = new uint256[](playCounter[msg.sender]);
        uint[] memory betsPlaced = new uint[](playCounter[msg.sender]);
        uint[] memory rewards = new uint[](playCounter[msg.sender]);
        bool[] memory claims = new bool[](playCounter[msg.sender]);
        uint i;
        for(i = 0; i < playCounter[msg.sender]; i++)
        {
            gameIds[i] = gamesLog[msg.sender][i+1].gameId;
            playerGuesses[i] = gamesLog[msg.sender][i+1].playerGuess;
            winningNumbers[i] = gamesLog[msg.sender][i+1].winningNumber;
            betsPlaced[i] = gamesLog[msg.sender][i+1].betPlaced;
            rewards[i] = gamesLog[msg.sender][i+1].reward;
            claims[i] = gamesLog[msg.sender][i+1].claimed;
        }
        
        return (gameIds, playerGuesses, winningNumbers, betsPlaced, rewards, claims);
    }
    
    
   /**
     * @dev Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId , uint256 randomness) internal override {
        randomResult= randomness.mod(100).add(1);
        gamesLog[playerAddress][counter].winningNumber = randomResult;
        distributeReward();
    }
    
    /** 
     * @notice initiates the start of the game and makes all necessary checks before continuing.
     * @dev Call startGame function after all checks and updates have been completed.
     * @param _guess is players guess.
     * @param _bettingAmount is the amount player is betting on the result.
     */
    function playGame(uint32 _guess, uint _bettingAmount) public onlyPlayer(){
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(_bettingAmount > 0, "Cannot process this amount");
        require(player[msg.sender].placedBets >= _bettingAmount, "Insufficient funds on the table. Please add funds to your bets.");
        require(_guess >= 1 || _guess <= 100,"Guess between 1 and 100");
        player[msg.sender].placedBets -= _bettingAmount;
        playCounter[msg.sender]++;
        counter = playCounter[msg.sender];
        gamesLog[msg.sender][counter].gamesPlayed = counter;
        playerAddress = msg.sender;
        uint userProvidedSeed = uint(keccak256(abi.encodePacked(block.number,block.difficulty,msg.sender)));
        startGame(userProvidedSeed, _guess, _bettingAmount);
    }

    /**
     * @notice start the game.
     * @dev confirm the players guess.
     * @dev Requests randomness from a user-provided seed
     * @dev can only be called by registered players.
     * @param _userProvidedSeed provided by playGame method to generate random number.
     * @param _guess is the players guess.
     * @param _bettingAmount is the amount the player has bet on the result of the current game.
     * @return requestId 
     */  
    function startGame(uint256 _userProvidedSeed, uint32 _guess, uint _bettingAmount) internal returns (bytes32 requestId) {
        confirmGuess(_guess, _bettingAmount);
        require(playing == true);
        requestId = requestRandomness(keyHash, fee, _userProvidedSeed);
        gamesLog[msg.sender][counter].gameId = _userProvidedSeed.mod(1000).add(1);
        emit RequestedRandomness(requestId);
        return requestId;
    }

    /**
     * @notice Players guesses are processed by this function.
     * @dev function accepts funds from player. Funds are accepted as bet for the game.
     * @param _guess players guess.
     * @param _bettingAmount is the amount the player has placed as a bet in this game.
     * @return player guess.
     */
    function confirmGuess(uint _guess, uint _bettingAmount) internal returns(uint) {
        gamesLog[msg.sender][counter].playerGuess = _guess;
        gamesLog[msg.sender][counter].betPlaced = _bettingAmount;
        playing = true;
        emit Guess(msg.sender, _guess);
        return _guess;
    }

    
    /** 
     * @notice determines rewards distributed according to the results.
     * @dev check and update games log map according to results.
     */
    function distributeReward() internal {
        uint guess = gamesLog[playerAddress][counter].playerGuess;
        uint winningNo = gamesLog[playerAddress][counter].winningNumber;
        uint bet = gamesLog[playerAddress][counter].betPlaced;
        if(winningNo != guess){
            gamesLog[playerAddress][counter].reward = 0;
            emit Result(playerAddress, false, guess, winningNo);
        } else if(winningNo == guess){
            gamesLog[playerAddress][counter].reward = bet*2;
        }
    } 
    
    
}

/**
 * @title TestGame for unit testing GuessingGame functions
 * @author Maccs
 * @dev Contract written for unti testing internal functions implemented in GuessingGame contract.
 * Internal functions inherited below are startGame(), confirmGuess() & distirbuteReward(). 
 * @dev LINK token address: 0xa36085f69e2889c224210f603d836748e7dc0088
 * @dev Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
 * @dev Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
 * @dev Fee: 100000000000000000
 */

 contract TestGame is GuessingGame{

//     //S T R U C T
//     struct GameLog{
//         uint gameId;
//         uint256 playerGuess;
//         uint256 winningNumber;
//         uint betPlaced;
//         uint reward;
//         uint32 gamesPlayed;
//         bool winner;
//         bool claimed;
//     }
    

//     // S T A T E  V A R I A B L E
    address private playerAddress;
    uint32  private counter;
//     uint private bettingAmount;
//     bool private cWinnerMutex;
    bool private playing;
//     bytes32 internal keyHash;
//     uint256 internal fee;
    


    constructor(address _linkTokenAddress, bytes32 _keyHash, 
    address _vrfCoordinatorAddress, uint256 _fee) 
    public 
    GuessingGame( 
        _linkTokenAddress,
        _keyHash,
        _vrfCoordinatorAddress, 
        _fee
        )  
        {
            // vrfCoordinatorAddress = _vrfCoordinatorAddress;
            // linkTokenAddress =_linkTokenAddress;
            keyHash = _keyHash;
            fee = _fee;
        }

    /**
     * @notice start the game.
     * @dev confirm the players guess.
     * @dev Requests randomness from a user-provided seed
     * @dev can only be called by registered players.
     * @param _userProvidedSeed provided by playGame method to generate random number.
     * @param _guess is the players guess.
     * @param _bettingAmount is the amount the player has bet on the result of the current game.
     * @return requestId 
     */  
    function _startGame(uint256 _userProvidedSeed, uint32 _guess, uint _bettingAmount) public returns (bytes32 requestId) {
        confirmGuess(_guess, _bettingAmount);
        require(playing == true);
        requestId = requestRandomness(keyHash, fee, _userProvidedSeed);
        gamesLog[msg.sender][counter].gameId = _userProvidedSeed.mod(1000).add(1);
        emit RequestedRandomness(requestId);
        return requestId;
    }


    /**
     * @notice Players guesses are processed by this function.
     * @dev function accepts funds from player. Funds are accepted as bet for the game.
     * @param _guess players guess.
     * @param _bettingAmount is the amount the player has placed as a bet in this game.
     * @return player guess.
     */
    function _confirmGuess(uint _guess, uint _bettingAmount) public returns(uint) {
        gamesLog[msg.sender][counter].playerGuess = _guess;
        gamesLog[msg.sender][counter].betPlaced = _bettingAmount;
        playing = true;
        emit Guess(msg.sender, _guess);
        return _guess;
    }


    /** 
     * @notice determines rewards distributed according to the results.
     * @dev check and update games log map according to results.
     */
    function _distributeReward() public {
        uint256 guess = gamesLog[msg.sender][counter].playerGuess;
        uint256 winningNo = gamesLog[msg.sender][counter].winningNumber;
        uint bet = gamesLog[msg.sender][counter].betPlaced;
        if(winningNo != guess){
            gamesLog[msg.sender][counter].reward = 0;
            emit Result(msg.sender, false, guess, winningNo);
        } else if(winningNo == guess){
            gamesLog[msg.sender][counter].reward = bet*2;
            emit Result(msg.sender, false, guess, winningNo);
        }
    } 

    function fillLogs(
        uint _gameId,
        uint256 _playerGuess,
        uint256 _winningNumber,
        uint _betPlaced,
        uint _reward,
        uint32 _gamesPlayed,
        bool _winner,
        bool _claimed,
        uint32 _counter
    )
    public 
    {
        gamesLog[msg.sender][_counter].gameId = _gameId;
        gamesLog[msg.sender][_counter].playerGuess = _playerGuess;
        gamesLog[msg.sender][_counter].winningNumber = _winningNumber;
        gamesLog[msg.sender][_counter].betPlaced = _betPlaced;
        gamesLog[msg.sender][_counter].reward = _reward;
        gamesLog[msg.sender][_counter].gamesPlayed = _gamesPlayed;
        gamesLog[msg.sender][_counter].winner = _winner;
        gamesLog[msg.sender][_counter].claimed = _claimed;
        counter = _counter;
        
    }
 }
