var buttonColors = ["red" , "blue" , "green" , "yellow"] ;
var userSequence = [] ;
var level = 0;
var gameSequence = [] ;
var started = false ;
$(document).keypress(function () {
  if (!started) {
    nextSequence() ;
    started = true ;
}
});
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id") ;
  userSequence.push(userChosenColor) ;
  playSound(userChosenColor) ;
  animatePress(userChosenColor) ;
  checkAnswer(userSequence.length-1);
});


function nextSequence() {
  userSequence = [] ; 
  level++ ;
  $("h1").text("Level " + level) ;
 
  var randomNumber = Math.floor(Math.random()*4) ;
  var randomChosenColor = buttonColors[randomNumber] ;
  gameSequence.push(randomChosenColor) ;
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor) ;
  
}

function playSound(name) {
  var src = "./sounds/" + name + ".mp3" ;
  var a = new Audio(src) ;
  a.play() ;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed") ;
  setTimeout(function() {
    $("#"+ currentColor).removeClass("pressed");
  } , 300);
}

function checkAnswer(currentLevel) {
    if (gameSequence[currentLevel] == userSequence[currentLevel]) {
      if (userSequence.length === gameSequence.length) {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else {
      console.log("wrong") ;
      var wrong = new Audio("./sounds/wrong.mp3") ;
      wrong.play() ;
      $("body").addClass("game-over") ;
      setTimeout(function(){
        $("body").removeClass("game-over") ;
      },200) ;
      $("h1").text("Game Over , Press any key to Restart") ;
      startOver() ;
    }
}

function startOver() {
  userSequence = [] ;
  gameSequence = [] ;
  level = 0 ;
  started = false ;
}