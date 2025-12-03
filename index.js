// const canva = document.getElementById("gameCanvas");
// const Block_SIZE = 40;

// let foodCord = [1, 5];
// let snakeCord = [
//   [0, 2],
//   [0, 1],
//   [0, 0],
// ];
// let direction = "down";
// function getrandomfood() {
//   let x = Math.floor(Math.random() * 10);
//   let y = Math.floor(Math.random() * 10);
//   foodCord = [x, y];
// }
// function drawfood() {
//   var ctx = canva.getContext("2d");
//   ctx.beginPath();
//   ctx.rect(
//     foodCord[0] * Block_SIZE,
//     foodCord[1] * Block_SIZE,
//     Block_SIZE,
//     Block_SIZE
//   );
//   ctx.fillStyle = "red";
//   ctx.fill();
// }
// function drawBoard() {
//   for (let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//       var ctx = canva.getContext("2d");
//       ctx.beginPath();
//       ctx.rect(i * Block_SIZE, j * Block_SIZE, Block_SIZE, Block_SIZE);
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = "#003300";
//       ctx.stroke();
//     }
//   }
// }
// function drawSnake() {
//   for (let i = 0; i < snakeCord.length; i++) {
//     var ctx = canva.getContext("2d");
//     ctx.beginPath();
//     ctx.rect(
//       snakeCord[i][0] * Block_SIZE,
//       snakeCord[i][1] * Block_SIZE,
//       Block_SIZE,
//       Block_SIZE
//     );
//     if (i === 0) {
//       ctx.fillStyle = "yellow";
//     } else {
//       ctx.fillStyle = "green";
//     }
//     ctx.fill();
//   }
// }
// function isFoodEaten() {
//   let head = snakeCord[0];
//   if (head[0] !== foodCord[0] || head[1] !== foodCord[1]) {
//     snakeCord.pop();
//     return;
//   }
//   getrandomfood();
// }
// getrandomfood();

// function render() {
//   const context = canva.getContext("2d");
//   context.fillStyle = "black"; // background
//   context.clearRect(0, 0, canva.width, canva.height);
//   drawBoard();
//   drawfood();
//   drawSnake();
// }
// let game;
// game = setInterval(function () {
//   if (direction === "down") {
//     let head = snakeCord[0];
//     let newhead = [head[0], head[1] + 1];
//     snakeCord.unshift(newhead);
//     isFoodEaten();
//   } else if (direction === "up") {
//     let head = snakeCord[0];
//     let newhead = [head[0], head[1] - 1];
//     snakeCord.unshift(newhead);
//     isFoodEaten();
//   } else if (direction === "left") {
//     let head = snakeCord[0];
//     let newhead = [head[0] - 1, head[1]];
//     snakeCord.unshift(newhead);
//     isFoodEaten();
//   } else if (direction === "right") {
//     let head = snakeCord[0];
//     let newhead = [head[0] + 1, head[1]];
//     snakeCord.unshift(newhead);
//     isFoodEaten();
//   }
//   render();

//   function endGame() {
//     let isDead = false;
//     for (let i = 1; i < snakeCord.length; i++) {
//       if (
//         snakeCord[0][0] === snakeCord[i][0] &&
//         snakeCord[0][1] === snakeCord[i][1]
//       ) {
//         isDead = true;
//       }
//     }
//     if (
//       snakeCord[0][0] < 0 ||
//       snakeCord[0][0] > 9 ||
//       snakeCord[0][1] < 0 ||
//       snakeCord[0][1] > 9
//     ) {
//       isDead = true;
//     }
//     if (isDead) {
//       clearInterval(game);
//       alert("Game over");
//     }
//   }
//   endGame();
// }, 100);

// document.addEventListener("keydown", function (event) {
//   if (event.key === "ArrowDown" && direction !== "up") {
//     direction = "down";
//   }
//   if (event.key === "ArrowUp" && direction !== "down") {
//     direction = "up";
//   }
//   if (event.key === "ArrowLeft" && direction !== "right") {
//     direction = "left";
//   }
//   if (event.key === "ArrowRight" && direction !== "left") {
//     direction = "right";
//   }
// });
const canva = document.getElementById("gameCanvas");
const Block_SIZE = 40;

let foodCord = [1, 5];
let snakeCord = [
  [0, 2],
  [0, 1],
  [0, 0],
];
let direction = "down";

function getrandomfood() {
  let x, y;
  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (snakeCord.some((seg) => seg[0] === x && seg[1] === y));
  foodCord = [x, y];
}

function drawfood(ctx) {
  ctx.fillStyle = "red";
  ctx.fillRect(
    foodCord[0] * Block_SIZE,
    foodCord[1] * Block_SIZE,
    Block_SIZE,
    Block_SIZE
  );
}

function drawBoard(ctx) {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * Block_SIZE, 0);
    ctx.lineTo(i * Block_SIZE, canva.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * Block_SIZE);
    ctx.lineTo(canva.width, i * Block_SIZE);
    ctx.stroke();
  }
}

function drawSnake(ctx) {
  snakeCord.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? "yellow" : "green";
    ctx.fillRect(
      seg[0] * Block_SIZE,
      seg[1] * Block_SIZE,
      Block_SIZE,
      Block_SIZE
    );
  });
}

function isFoodEaten() {
  let head = snakeCord[0];
  if (head[0] === foodCord[0] && head[1] === foodCord[1]) {
    getrandomfood(); // grow snake
  } else {
    snakeCord.pop(); // move snake
  }
}

function render() {
  const ctx = canva.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canva.width, canva.height); // fill background
  drawBoard(ctx);
  drawfood(ctx);
  drawSnake(ctx);
}

function endGame() {
  let head = snakeCord[0];
  // collision with walls
  if (head[0] < 0 || head[0] > 9 || head[1] < 0 || head[1] > 9) return true;
  // collision with self
  for (let i = 1; i < snakeCord.length; i++) {
    if (head[0] === snakeCord[i][0] && head[1] === snakeCord[i][1]) return true;
  }
  return false;
}

getrandomfood();
render();

let game = setInterval(() => {
  let head = snakeCord[0];
  let newhead;
  if (direction === "down") newhead = [head[0], head[1] + 1];
  if (direction === "up") newhead = [head[0], head[1] - 1];
  if (direction === "left") newhead = [head[0] - 1, head[1]];
  if (direction === "right") newhead = [head[0] + 1, head[1]];

  snakeCord.unshift(newhead);
  isFoodEaten();

  if (endGame()) {
    clearInterval(game);
    alert("Game over");
    return;
  }

  render();
}, 200);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});
