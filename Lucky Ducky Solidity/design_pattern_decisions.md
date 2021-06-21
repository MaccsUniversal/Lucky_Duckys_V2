**Circuit Breakers**

The circuit breaker design pattern has been implemented in two of the functions within the `Slot_Machine.sol` contract:

`depositsCircuitBreaker()`, only accessible by the contract owner, is invoked when the contract owner wishes to disable/enable deposits. This was implemented so that in the event of an emergency i.e. funds being syphoned from the contract or deprecation, funds can no longer be deposited to the contract until the issue is resolved and updates are propagated.

`withdrawalCircuitBreaker()` is implemented for a similar reason. Halting withdrawals can be crucial when responding to an attack. This is would be the most important reason for invoking this method.

**Pull over Push Payments**

In order to protect the contract and its users against re-entrancy and DOS attacks I have employed the Pull over Push AKA the withdrawal pattern in the `Slot_Machine.sol` contract and the `Guessing_Game.sol` contract. 

Accounting is managed by the `player[msg.sender].balance`, `player[msg.sender].placedBets` and `gamesLog[msg.sender][x].reward` (where x is the number of games played) properties of the Player struct and GameLog struct respectively.  

This way only a maximum of the total amount available in a players balance can be moved at once. There are no calls to the fallback function of a calling contract unless `withdrawal()` or `withdrawBalance()` is called. Denial of service attacks are avoided for the same reason. 
Funds are can only be withdrawn from the contract via the withdraw methods confining withdrawals to two places, which is simpler to maintain. 

**Mortal**

This design pattern has been implemented so the owner can destroy the contract and remove it from the blockchain should it be required. 

**Restricted Access**

There are many functions that have restricted access as a layer of security to the contract. The circuit breakers will execute only is the contract owner calls these methods. Any body can deposit ETH to the contract but only players can move funds around, play the game, view results and claim rewards. 
  


