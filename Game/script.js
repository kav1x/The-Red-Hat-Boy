var username;
var high_score = 0;
var nameInputCount; 



high_score = localStorage.getItem("high_score");
console.log(`High Score : ${high_score}`);

if (high_score == 0 || high_score == null) {
    localStorage.setItem("high_score", 0);
    localStorage.setItem("high_score_user", null);

    document.getElementById("high_score").classList.add("hide");
}

function controller(event) {

    if (event.key == " ") {
        if (runWorker != 0) {

            runSound.pause();
            clearInterval(runWorker);

            if (jumpWoker == 0) {
                jump();
                jumpSound.play();

            }
        }
    }

}

function checkInput() {
    const inputElement = document.getElementById('nameInput');
    const inputValue = inputElement.value.trim(); 

    if (!inputValue) {
        console.log("Input is empty or null!");
    } 
    else {
        if (runWorker == 0) {
            username = document.getElementById("nameInput").value;
    
            if(username != null || username != " "){
                moveBg();
                run();
                updateScore();
                updateHighScore();
                localStorage.setItem("nameInputCount",1);
                flameX.forEach(createFlame);
                document.getElementById("input").classList.add("hide");
                runSound.play();
    
            } 
        }
    }
}

function start() {

    checkInput();

}

function cleartxt() {
    document.getElementById("nameInput").value = "";

}

var runImage = 1;
var runWorker = 0;
var runSound = new Audio("audio/run.mp3")
runSound.loop = true;

function run() {
    if (runWorker == 0) {
        runWorker = setInterval(() => {
            runImage += 1;

            if (runImage == 9) {
                runImage = 1;
            }

            document.getElementById("boy").src = "images/run" + runImage + ".png";
        }, 70);
    }
}

var moveBgX = 0;
var bgWoker = 0;

function moveBg() {
    if (bgWoker == 0) {
        bgWoker = setInterval(() => {
            moveBgX -= 10;
            document.getElementById("background").style.backgroundPositionX = moveBgX + "px";

        }, 50);

    }

}

var deadImage = 1;
var deadWorker = 0;
var deadSound = new Audio("audio/dead.mp3");
function dead() {

    deadWorker = setInterval(() => {
        deadImage += 1;
        document.getElementById("boy").src = "images/dead" + deadImage + ".png";

        if (deadImage == 10) {

            clearInterval(deadWorker);

        }

    }, 150);
}

var scoreWorker = 0;
var score = 0;

function updateScore() {

    scoreWorker = setInterval(() => {
        score = score + 10;
        document.getElementById("score").innerHTML = "Score: " + score;

    }, 300);

}
var high_score_user;
function setScore() {
    localStorage.setItem(username, score);

    if (score > high_score) {
        localStorage.setItem("high_score", score);
        localStorage.setItem("high_score_user", username);

        document.getElementById("alert").classList.remove("hide");
        document.getElementById("alertScore").innerHTML = "NEW HIGH SCORE <br>" + score;

    }
    else {

        document.getElementById("alert").classList.remove("hide");
        document.getElementById("alertScore").innerHTML = "YOUR SCORE <br>" + score;

    }

}

function quit() {

    window.close();
    localStorage.removeItem("nameInputCount");

}

function restart() {

    location.reload();
}

function updateHighScore() {
    x = localStorage.getItem("high_score_user");
    document.getElementById("high_score").innerHTML = ("High Score: " + x + " " + high_score);
}

var jumpWoker = 0;
var jumpImage = 0;
var jMargin = 450;
var jumpSound = new Audio("audio/jump.mp3")

function jump() {

    jumpWoker = setInterval(() => {

        jumpImage += 1;
        if (jumpImage < 8) {

            jMargin -= 10;
            document.getElementById("boy").style.marginTop = jMargin + "px";

        }
        else if (jumpImage > 7) {
            jMargin += 10;
            document.getElementById("boy").style.marginTop = jMargin + "px";
        }
        if (jumpImage == 13) {
            jumpImage = 1;

            clearInterval(jumpWoker);
            runWorker = 0;
            run();
            jumpWoker = 0;
            runSound.play();
        }

        document.getElementById("boy").src = "images/jump" + jumpImage + ".png";

    }, 50);

}

function generateRandomNumbers(start, numSteps, minStep, maxStep) {
    let numbers = [start];
    let currentNumber = start;

    for (let i = 0; i < numSteps; i++) {
        let randomStep = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
        randomStep = Math.round(randomStep / 10) * 10;
        currentNumber += randomStep;
        numbers.push(currentNumber);
    }
    return numbers;
}

var flameX = generateRandomNumbers(500, 100, 300, 700);
console.log(flameX);

var flameWorker = 0;

function createFlame(x) {

    var i = document.createElement("img");
    i.src = "images/flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    flameWorker = setInterval(() => {
        if (flameWorker != 0) {

            x = x - 10;
            i.style.marginLeft = x + "px";
        }

        if (x == 100) {
            if (jumpWoker == 0) {

                if (runWorker != 0) {
                    clearInterval(flameWorker);
                    flameWorker = 0;
                    runSound.pause();
                    clearInterval(runWorker);
                    clearInterval(bgWoker);
                    clearInterval(scoreWorker);


                    if (deadWorker == 0) {
                        dead();
                        deadSound.play();

                        setTimeout(() => {
                            setScore();
                        }, 1000);
                    }
                }
            }
        }
    }, 50);
}