let reset, join, client, host, submit;
let isHost = false; // Whether this client is the host
let peer, connection;

let circle;
let cross;

function preload() {
  circle = loadImage("assets/circlettt.png")
  cross = loadImage("assets/crossttt.png")
}

function setup() {
  createCanvas(1280, 720);

  reset = createButton("restart")
    .position(150, 180)
    .size(100, 50)
    .style('font-size', '24px')
    .mousePressed(setupGrid)

  host = createButton("host")
    .position(150, 60)
    .size(100, 50)
    .style('font-size', '24px')
    .mousePressed(initializeHost)

  client = createButton("client")
    .position(900, 60)
    .size(100, 50)
    .style('font-size', '24px')
    .mousePressed(initializeClient)

  join = createInput("paste host id here")
    .position(500, 60)
    .size(200, 50)
    .style('font-size', '24px')


  submit = createButton("submit")
    .position(900, 180)
    .size(100, 50)
    .style('font-size', '24px')
    .mousePressed(() => {
      joinRoom(join.value())
    })
  
  setupGrid()
}

function draw() {
  background(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let currBox = grid[i][j]
  
      currBox.render();
      currBox.update();
      
      if (currBox.hover()) {
        //print("hovering " + currBox.vec.x + currBox.vec.y)
  
        if (mouseIsPressed) {
          if (currBox.id == 0) {
  
            if (isHost) {
              if (currBox.id !== 1 ) {
                currBox.id = 1;
                if (connection && connection.open) {
                  connection.send({ obj: currBox });
                }
                print("cross in " + currBox.vec.x + currBox.vec.y)
              }
            }
            else {
              if (currBox.id !== 2) {
                currBox.id = 2;
                if (connection && connection.open) {
                  connection.send({ obj: currBox });
                }
                print("circle in " + currBox.vec.x + currBox.vec.y)
              }
            }
          }
        }
      }
    }
  }
}