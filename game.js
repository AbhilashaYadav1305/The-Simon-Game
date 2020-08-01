var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
let isStarted = false;

//bind keypress event to keyboard key pressed-Start game
$(document).on('keypress',function(event){
  if(!isStarted){
    isStarted=true;
    $("h1").text("Level 0");
    generatePattern();
  }
});

// bind click event to buttonPress
  $(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if(gamePattern.length === userClickedPattern.length)
        checkAnswer();
  });



// generate random clicks
function generatePattern() {
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  gamePattern.push(randomChosenColour);
}

// fadein out and generate sound
function playSound(color) {
  $("#" + color).fadeOut(100).fadeIn(100).fadeIn(100);
  // choose audio file
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

//Adding Animations
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Validating Generated patern
function checkAnswer(){
  let isMatch = true;
    for (let i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] != userClickedPattern[i]) {
        isMatch = false;
        wrongPattern();
        break;
      }
    }
    if (isMatch){
      increaseLevel();
    }
}

function wrongPattern() {
  level = 0;
  $("h1").text("Game Over!! Press any key to Restart!!");
  isStarted = false;
  resetAnimation();
  resetGame();
}

//Increasing Level on Every Correct pattern selection
function increaseLevel(){
  level++;
  $("h1").text("Level" + " " + level);
  clearUserPattern();
  setTimeout(generatePattern(), 3000);
}

function clearUserPattern(){
  userClickedPattern = [];
}   

//Reset
function resetGame(){
  clearUserPattern();
  gamePattern = [];
}

//Reset Animation settings
function resetAnimation(){
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
// choose audio file to be played when Wrong pattern is selected
var audio = new Audio("./sounds/wrong.mp3");
audio.play();
}
