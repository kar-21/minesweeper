function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount;
  this.mine = false;
  this.revealed = false;
}

Cell.prototype.show = function () {
  stroke(0);
  fill(255);
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.mine) {
      if (isGameOver) {
        fill(170, 0, 0);
      } else {
        fill(0, 170, 0);
      }
      ellipse(this.x + this.w / 2, this.y + this.w / 2, this.w * 0.6);
      revealMine();
    } else {
      stroke(0);
      fill(240);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount) {
        fill(0);
        textAlign(CENTER);
        text(this.neighborCount, this.x + this.w / 2, this.y + this.w / 1.5);
      }
    }
  } else {
    fill(215);
    noStroke();
    rect(this.x, this.y, this.w, this.w);
  }
};

Cell.prototype.countNeighbors = function () {
  let total = 0;
  if (this.mine) {
    this.neighborCount = -1;
  }
  for (let xoff = -1; xoff <= 1; xoff++) {
    let i = this.i + xoff;
    if (i < 0 || i >= cols) {
      continue;
    }
    for (let yoff = -1; yoff <= 1; yoff++) {
      let j = this.j + yoff;
      if (j < 0 || j >= rows) {
        continue;
      }
      let neighbor = grid[i][j];
      if (neighbor && neighbor.mine) {
        total++;
      }
    }
  }
  this.neighborCount = total;
};

Cell.prototype.contains = function (x, y) {
  return this.x < x && this.x + this.w > x && this.y < y && this.y + this.w > y;
};

Cell.prototype.reveal = function () {
  this.revealed = true;
  revealedCount++;

  if (this.neighborCount === 0) {
    this.floodFill();
  }

  if (this.mine) {
    return true;
  }

  return false;
};

Cell.prototype.floodFill = function () {
  for (let xoff = -1; xoff <= 1; xoff++) {
    let i = this.i + xoff;
    if (i < 0 || i >= cols) {
      continue;
    }
    for (let yoff = -1; yoff <= 1; yoff++) {
      let j = this.j + yoff;
      if (j < 0 || j >= rows) {
        continue;
      }
      let neighbor = grid[i][j];
      if (!neighbor.mine && !neighbor.revealed) {
        neighbor.reveal();
      }
    }
  }
};

