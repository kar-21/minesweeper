let grid;
let cols = 12;
let rows = 12;
let cellWidth = 40;

let mineCount = 21;
let revealedCount = 0;

let isGameOver = false;
let isGameComplete = false;

function setup() {
  createCanvas(490, 490);

  grid = make2Darray(cols, rows);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(i, j, cellWidth);
    }
  }

  let option = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      option.push([i, j]);
    }
  }

  for (let n = 0; n < mineCount; n++) {
    let index = floor(random(option.length));
    let [i, j] = option[index];
    option.splice(index, 1);
    grid[i][j].mine = true;
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].countNeighbors();
    }
  }
}

function make2Darray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function draw() {
  background(255);

  grid.forEach((cols) => {
    cols.forEach((element) => {
      element.show();
    });
  });

  if (revealedCount + mineCount === rows * cols) {
    console.log(revealedCount, mineCount, revealedCount + mineCount, rows * cols);
    isGameComplete = true;
    revealMine();
  }
}

function mousePressed() {
  grid.forEach((cols) => {
    cols.forEach((element) => {
      if (element.contains(mouseX, mouseY)) {
        if (element.reveal()) {
          isGameOver = true;
        }
      }
    });
  });
}

revealMine = function () {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].mine) {
        grid[i][j].revealed = true;
      }
    }
  }
};
