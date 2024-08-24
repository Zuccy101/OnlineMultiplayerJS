
let grid = [];

function Box(id, posx, posy, vecx, vecy) {
  
  this.id = id;
  this.x = posx;
  this.y = posy;
  this.vec = createVector(vecx, vecy);
  this.wh = 100;

  this.dx = this.x + (this.wh * this.vec.x) + width/3
  this.dy = this.y + (this.wh * this.vec.y) + height/3

  this.render = function() {
    fill(255)
    rect(this.dx, this.dy, this.wh, this.wh)
  }

  this.hover = function() {
    return(
      mouseX > this.dx && mouseX < this.dx + this.wh &&
      mouseY > this.dy && mouseY < this.dy + this.wh
    )
  }

  this.update = function() {

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

}

function setupGrid() {

  for (let x = 0; x < 3; x ++) {
    let row = [];
    for (let y = 0; y < 3; y ++) {
      let box = new Box(0, x * 20, y * 20, x, y)
      row.push(box);
    }
    grid.push(row);
  }
  print(grid.length)
}