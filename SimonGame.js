var buttonColours = ["red", "green", "blue", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function() {
    // statement below shows, how you select an attribute(here"id")
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern=[];

    level++;

    $("#level-title").text("level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}
