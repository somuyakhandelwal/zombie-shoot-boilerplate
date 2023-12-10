// Iteration 1: Declare variables required for this game
const gameContainer = document.getElementById("game-body");
const livesDisplay = document.getElementById("lives");
var remainingSeconds = document.getElementById("timer").textContent;
var zombieCounter = 0;
const zombieImages = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume = 0.2;
gameContainer.onclick = () => {
  shotgunSound.pause();
  shotgunSound.currentTime = 0;
  shotgunSound.play();
};

// Iteration 1.3: Add background sound
const backgroundMusic = new Audio("./assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

// Iteration 1.4: Add lives
const maxLives = 4;
var playerLives = 4;

// Iteration 2: Write a function to make a zombie
function createZombie() {
  const randomImage = zombieImages[getRandomInt(0, zombieImages.length)];
  gameContainer.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieCounter}">`;
  let zombie = document.getElementById("zombie" + zombieCounter);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    destroyZombie(zombie);
  };
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
  if (zombie.getBoundingClientRect().top <= 0) {
    playerLives--;
    return true;
  }
  return false;
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
  zombie.style.display = "none";
  zombieCounter++;
  createZombie();
}

// Iteration 5: Creating timer
var gameTimer = setInterval(function () {
  remainingSeconds--;
  document.getElementById("timer").textContent = remainingSeconds;
  let zombie = document.getElementById("zombie" + zombieCounter);
  if (checkCollision(zombie) == true) {
    destroyZombie(zombie);
    if (playerLives == 0) {
      clearInterval(gameTimer);
      location.href = "./game-over.html";
    }
  }
  if (remainingSeconds == 0) {
    clearInterval(gameTimer);
    location.href = "./win.html";
  }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie(zombieCounter);

// Iteration 7: Write the helper function to get a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
