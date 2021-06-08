function claimRewards(_id, _number){
    startApp();
    guessingGame.methods.claimReward(_id, _number)
    .send({
        from: account,
        gas: 3000000
    }, function(error,confirmed){
        if(!error){
            console.log(confirmed);
            window.location.reload();
        } else {
            console.log(error);
        }
    })
}