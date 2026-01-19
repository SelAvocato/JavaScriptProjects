const playerHand = document.getElementById("playerO")
const choices = ["rock", "paper", "scissors"]
const leaderboardPlayerScore = document.getElementById("scoreP");
const leaderboardComputerScore = document.getElementById("scoreC");
const leaderboardTies = document.getElementById("scoreT");

let leaderboards = {
    playerScore: 0, 
    computerScore: 0, 
    ties: 0
}

const options = document.querySelectorAll(".options img")


options.forEach(option => {
    option.addEventListener("click", event => {
        playerHand.textContent = event.target.alt
        playerHand.classList.add("chosed");

        vsComputer()
    })
})

const vsComputer = () => {
    const computerHand = document.getElementById("compO")

    computerHand.textContent = choices[Math.floor(Math.random() * choices.length)]
    computerHand.classList.add("chosed");
    
    if(playerHand.textContent == computerHand.textContent){
        matchOutcome("tied")
        return
    } else {
        let f = "..."
        switch(computerHand.textContent){
            case("rock"):
                f = playerHand.textContent === "paper" ? "won" : "lose"
                break;
            case("paper"):
                f = playerHand.textContent === "scissors" ? "won" : "lose"
                break;
            case("scissors"):
                f = playerHand.textContent === "rock" ? "won" : "lose"
                break;
        }
        matchOutcome(f)  
    }
}

const matchOutcome = result => {
    const outcome = document.getElementById("outcome")
    
    switch(result){
        case("won"):
            outcome.classList.remove("lose", "tied");
            outcome.classList.add("won");
            outcome.textContent = "YOU WON!!";
            leaderboards.playerScore++;
            leaderboardPlayerScore.textContent = leaderboards.playerScore;
            break;
        case("lose"):
            outcome.classList.remove("won", "tied");
            outcome.classList.add("lose");
            outcome.textContent = "YOU LOSE!";
            leaderboards.computerScore++;
            leaderboardComputerScore.textContent = leaderboards.computerScore;
            break;
        case("tied"):
            outcome.classList.remove("won", "lose");
            outcome.classList.add("tied");
            outcome.textContent = "TIED";
            leaderboards.ties++;
            leaderboardTies.textContent = leaderboards.ties;
            break;
    }
}

const reset = () => {
leaderboards = {
    playerScore: 0, 
    computerScore: 0, 
    ties: 0
}
    leaderboardPlayerScore.textContent = leaderboards.playerScore;
    leaderboardComputerScore.textContent = leaderboards.computerScore;
    leaderboardTies.textContent = leaderboards.ties;
}