# Lucky_Duckys_V2

**LUCKY DUCKYS**

Lucky-Duckys is a simple betting game, where players guess the number, between 1 and 100, to be returned by the random number generator. 
At the moment the outcome of the game is predictable: if you guess wrong you lose your bet and if your guess right you double your money. 
However, there are plans to incorporate a staking element where losers bets go into a staking pool earning them rewards for a minimum amount of time. Winners can choose how much of their winnings they wish to allocate to the pool. As stated earlier this has not yet been included in the game.
Directory Structure.

The main directories are made up of the following:

  1.	Smart contracts 
  2.	Frontend
  
**Smart Contracts**

build/contracts folder contains all json artifacts of smart contracts compiled and deployed using truffle.
contracts folder include all smart .sol files that make up Lucky-Duckys.
migrations holds all .js files that inform truffle of what to implement when deploying artifact files to the blockchain.
test comprises of .js test files for Slot_machine , Guessing_Game and Player contracts.

**Frontend**

Frontend folders & files include Images, Web3_Scripts, scripts, sheets, bundle.js and index.html. 
background image clouds&bird.jpg is located within the Image folder. 
All .css files are located within the sheets folder. 

The scripts folder is where many of the interactive .js files are kept including the theme_change.js file which inverts the primary/secondary colour of the UI. 
All the files that interact with the smart contract are stored within the Web3_Scripts folder.

**Please Note:**
You will need to use browserify to update the bundle.js with changes made to Web3_Scripts/web3Implementations.js. installation instructions for browserify can be found at the link provided but you will need Node.js install beforehand.

Use the following command to update bundle.js file:

	npm start build

Install and Run
Create a directory for the downloaded folders/files, using command prompt:

  `mkdir Lucky_Duckys_Project`

Download and install Node.js. 

You can find instructions on how to do this here: https://nodejs.org/en/download/ and here: https://nodejs.dev/learn/how-to-install-nodejs.

Install lite-server

Make sure you have a localhost server installed on your machine. I use lite-server and you can download this using the command:

`npm install -g lite-server`


package.json file will already have the lite-server as a dependency:


`“devDependencies”: {
     	    “lite-server”: ^2.6.1
}`


While in the Lucky_Duckys_Project directory run the following command:

	npm start dev

then navigate your localhost to: http://localhost:3000/src/index.html


