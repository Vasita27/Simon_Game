gamePattern=[];
userClickedPattern=[];
buttonColours=["red","blue","green","yellow"]
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

})
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log("helooooooooo");
    playSound(randomChosenColor);}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        started=true;
        nextSequence();

    }
})
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            console.log("success");
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        wrongFunction()
    }
}
function wrongFunction(){
    var audio=new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
