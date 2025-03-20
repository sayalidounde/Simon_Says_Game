let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "purple"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0;
let h2 = document.querySelector("h2");

// Start the game on key press
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUP();
    }
});

// Function to flash game sequence
function gameFlash(btn) {
    if (!btn) {
        console.error("Invalid button element");
        return;
    }
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// Function to flash user click
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

// Handle button press
function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

// Attach click event listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Level up and add new color to sequence
function levelUP() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    let randInx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`#${randColor}`);

    if (!randBtn) {
        console.error(`Button with ID '${randColor}' not found!`);
        return;
    }

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

// Check user answer
function checkAns(inx) {
    if (userSeq[inx] === gameSeq[inx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUP, 1000);
        }
    } else {
        // Update high score if current score is the highest
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> | High Score: <b>${highScore}</b> <br> Press any key to start.`;
        reSet();

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
    }
}

// Reset game
function reSet() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}
