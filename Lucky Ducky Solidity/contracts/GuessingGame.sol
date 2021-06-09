pragma solidity >=0.6.0 <0.8.0;
//SPDX-License-Identifier: UNLICENSED

//import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./Slot_Machine.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Kovan
     * LINK token address:                0xa36085f69e2889c224210f603d836748e7dc0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4 
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * 100000000000000000
     */

contract GuessingGame is Slot_Machine, VRFConsumerBase{
    
    //S T R U C T
    struct GameLog{
        uint256 gameId;
        uint256 playerGuess;
        uint256 winningNumber;
        uint betPlaced;
        uint reward;
        uint32 gamesPlayed;
        bool winner;
        bool claimed;
    }
    

    // S T A T E  V A R I A B L E
    address playerAddress;
    uint32 counter;
    uint public bettingAmount;
    bool cWinnerMutex;
    bool private playing;
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    event RequestedRandomness(bytes32 requestId);
    
    //M A P P I N G
    mapping (address => mapping (uint => GameLog)) public gamesLog;  //tracks player interaction and game results.
    mapping (address => uint32) public playCounter; //counts how many times the game has been played.

    // E V E N T S
    event Guess(address indexed player, uint indexed guess);
    event WinningNumber(address indexed player, uint indexed winningNo);
    event Result(address indexed player, bool indexed winnner, uint indexed guess, uint winningNo);
    event RewardClaimed(address indexed player, uint indexed rewardClaimed, uint indexed newBalance);

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
            //guessingGame = GuessingGame(address(this));
        }


    function getLinkBalance() public view returns(uint){
        return LINK.balanceOf(address(this));
    }
    /// @notice Players guesses are processed by this function.
    /// @dev function accepts funds from player. Funds are accepted as bet for the game. 
    /// @param _guess players guess.
    function confirmGuess(uint32 _guess, uint _bettingAmount) internal returns(uint) {
        gamesLog[msg.sender][counter].playerGuess = _guess;
        gamesLog[msg.sender][counter].betPlaced = _bettingAmount;
        playing = true;
        emit Guess(msg.sender, _guess);
        return _guess;
    }
    
    //Pay player - internal function
    function claimAllRewards() public onlyPlayer(){
        //return array of mapping and all rewards are stored in a totalRewards variable.
        //totalRewards are then added to players balance.
        uint totalRewards;
        
        for(uint256 i = 0; i < playCounter[msg.sender]; i++) {
            if(gamesLog[msg.sender][i].reward > 0 && gamesLog[msg.sender][i].claimed == false){
                totalRewards = totalRewards + gamesLog[msg.sender][i].reward;
                gamesLog[msg.sender][i].claimed = true;
            }
            player[msg.sender].balance += totalRewards;
        }
    }
    
    function claimReward(uint32 _gameId, uint _counter) public onlyPlayer(){
        require(_gameId == gamesLog[msg.sender][_counter].gameId);
        require(gamesLog[msg.sender][_counter].claimed = false);
        gamesLog[msg.sender][_counter].claimed = true;
        player[msg.sender].balance += gamesLog[msg.sender][_counter].reward;
        emit RewardClaimed(msg.sender, gamesLog[msg.sender][_counter].reward, player[msg.sender].balance);
    }
    
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
    
    function startGame(uint256 _userProvidedSeed, uint32 _guess, uint _bettingAmount) internal returns (bytes32 requestId) {
        reEntrancyMutex = true;
        confirmGuess(_guess, _bettingAmount);
        require(playing == true);
        require(LINK.balanceOf(address(this)) >= fee, "Insufficient balance for request");
        requestId = requestRandomness(keyHash, fee, _userProvidedSeed);
        gamesLog[msg.sender][counter].gameId = _userProvidedSeed.mod(1000).add(1);
        emit RequestedRandomness(requestId);
        return requestId;
    }
    
   /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId , uint256 randomness) internal override {
        uint256 myRandomNumber = randomness.mod(100).add(1);
        randomResult = myRandomNumber; //line to be removed as redundancy
        gamesLog[playerAddress][counter].winningNumber = randomResult;
        distributeReward();
    }
    
    /** 
     * Requests randomness from a user-provided seed
     */
    function playGame(uint32 _guess, uint _bettingAmount) public onlyPlayer(){
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        require(player[msg.sender].placedBets >= _bettingAmount, "Insufficient funds on the table. Please add funds to your bets.");
        require(_bettingAmount >= 1, "Minimum bet of 1 is required");
        require(_guess >= 1 || _guess <= 100,"Guess between 1 and 100");
        player[msg.sender].placedBets -= _bettingAmount;
        playCounter[msg.sender]++;
        counter = playCounter[msg.sender];
        gamesLog[msg.sender][counter].gamesPlayed = counter;
        playerAddress = msg.sender;
        uint userProvidedSeed = uint(keccak256(abi.encodePacked(block.number,block.difficulty,msg.sender)));
        startGame(userProvidedSeed, _guess, _bettingAmount);
    }
    
    function distributeReward() internal {
        if(gamesLog[playerAddress][counter].winningNumber != gamesLog[playerAddress][counter].playerGuess){
            gamesLog[playerAddress][counter].reward = 0;
        } else if(gamesLog[playerAddress][counter].winningNumber == gamesLog[playerAddress][counter].playerGuess){
            gamesLog[playerAddress][counter].reward = gamesLog[playerAddress][counter].betPlaced*2;
        }
    } 
    
    
}