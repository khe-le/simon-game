
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = true;
var currentIndex = 0;
var wrongAudio  = new Audio('sounds/wrong.mp3');


//This adds the next pattern to game pattern
function nextSequence() {
    //Choose a random button to flash
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
 
    //Update game pattern
    gamePattern.push(randomChosenColor);

    //Make randomly chosen button flash and play sound
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    //Update game level after game pattern is updated
    $("h1").text("Level " + level);
    level++;
}

//This is executed when a button is clicked
$(".btn").on('click', function(){
    if (!gameOver) {
        //Get id of the clicked button
        var userChosenColor = $(this).attr("id");

        //Update user clicked button pattern
        userClickedPattern.push(userChosenColor);

        //Play the sound of the clicked button
        playSound(userChosenColor);

        //Apply the 'pressed' look to clicked button 
        animatePress(userChosenColor);

        //Validate user's answer
        checkAnswer(currentIndex);
    }
})

//Helper checks whether user's answer matches game pattern
function checkAnswer(i) {
        if (gamePattern[i] === userClickedPattern[i]) {
            if ((i + 1) < gamePattern.length) {
                currentIndex++;
            }
            else {
                userClickedPattern = [];
                currentIndex = 0;
                setTimeout(function(){ nextSequence() },1000); // Call nextSequence after a 1000miliseconds delay
            }
        }
        else {
            // Gameover alert
            $("h1").text("Game over. Press any key to restart.");
            $("body").addClass("game-over");
            wrongAudio.play();
            setTimeout(function(){ $("body").removeClass("game-over")},200);
            startOver();
        }


}

//Helper function to play sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Adds press effect to clicked buttons
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    //Remove press effect after 100 miliseconds
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}

//Start game upon keypress
$(document).on('keypress', function(){
    if(gameOver) {
        nextSequence();
        gameOver = false;
    }
})

//Helper function to restart
function startOver() {
    //Reset all variables
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currentIndex = 0;
    gameOver = true;
}













