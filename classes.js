let grid = [];

const winningCombinations = [
  // Horizontal combinations
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  
  // Vertical combinations
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  
  // Diagonal combinations
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

class Box {
  constructor(id, posx, posy, vecx, vecy) {

    this.id = id;
    this.x = posx;
    this.y = posy;
    this.vec = createVector(vecx, vecy);
    this.wh = 100;
    this.fill = 255;
  
    this.dx = this.x + (this.wh * this.vec.x) + width/3
    this.dy = this.y + (this.wh * this.vec.y) + height/3

  }

  render() {
    fill(this.fill)
    rect(this.dx, this.dy, this.wh, this.wh)

    if (this.id == 1) {
      image(
        cross,
        this.dx,
        this.dy,
        this.wh,
        this.wh,
      )
    }
    else if (this.id == 2) {
      image(
        circle,
        this.dx,
        this.dy,
        this.wh,
        this.wh,
      )
    }
  }

  hover() {
    return(
      mouseX > this.dx && mouseX < this.dx + this.wh &&
      mouseY > this.dy && mouseY < this.dy + this.wh
    )
  }
}

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const boxA = grid[a[0]][a[1]];
    const boxB = grid[b[0]][b[1]];
    const boxC = grid[c[0]][c[1]];

    if (boxA.id !== 0 && boxA.id === boxB.id && boxA.id === boxC.id) {
      // We have a winner
      return boxA.id; // Return the id of the winning player (1 for cross, 2 for circle)
    }
  }
  return null; // No winner yet
}

function setupGrid() {
  grid = [];

  for (let x = 0; x < 3; x ++) {
    let row = [];
    for (let y = 0; y < 3; y ++) {
      let newbox = new Box(0, x * 20, y * 20, x, y);
      row.push(newbox);
    }
    grid.push(row);
  }
  print(grid.length)
}