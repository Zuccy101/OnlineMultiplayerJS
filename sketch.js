let reset, join, client, host, submit, hostid, clientid;
let isHost = false; // Whether this client is the host
let peer, connection;

let circle;
let cross;

function preload() {
  circle = loadImage("assets/circlettt.png")
  cross = loadImage("assets/crossttt.png")
}

function setup() {
  createCanvas(1080, 720);

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

    submit = createButton("submit")
    .position(900, 180)
    .size(100, 50)
    .style('font-size', '24px')
    .mousePressed(() => {
      joinRoom(join.value())
    })

    join = createInput("paste host id here")
      .position(425, 30)
      .size(200, 25)
      .style('font-size', '16px')

    hostid = createButton("")
      .position(100, 120)
      .size(200, 40)
      .style('font-size', '16px')
      .mousePressed(() => {
        copyToClipboard(hostid.html());
      });

    clientid = createButton("")
      .position(850, 120)
      .size(200, 40)
      .style('font-size', '16px')
      .mousePressed(() => {
        copyToClipboard(clientid.html());
      });

  
  setupGrid()
}

function draw() {
  background("#1d1e31");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let currBox = grid[i][j]
  
      currBox.render();
      
      if (currBox.hover()) {
        //print("hovering " + currBox.vec.x + currBox.vec.y)
  
        if (mouseIsPressed) {
          if (currBox.id == 0) {
  
            if (isHost) {
              if (currBox.id !== 1 ) {
                currBox.id = 1;
                //grid[currBox.vec.x][currBox.vec.y] = currBox
                if (connection && connection.open) {
                  connection.send({ obj: currBox });
                }
                print("cross in " + currBox.vec.x + currBox.vec.y)
              }
            }
            else {
              if (currBox.id !== 2) {
                currBox.id = 2;
                //grid[currBox.vec.x][currBox.vec.y] = currBox
                if (connection && connection.open) {
                  connection.send({ obj: currBox });
                }
                print("circle in " + currBox.vec.x + currBox.vec.y)
              }
            }

            let result = checkWinner();
            if (result) {
              print("Player " + result.player + " wins!");

              // Highlight the winning combination
              for (let box of result.combination) {
                box.fill = "#be2665";
              }

              winner = false;
              setTimeout(setupGrid, 1000)
            }
          }
        }
      }
    }
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
      return {
        player: boxA.id,
        combination: [boxA, boxB, boxC]
      }; // Return the id of the winning player (1 for cross, 2 for circle)
    }
  }
  return null; // No winner yet
}

function copyToClipboard(str) {

  navigator.clipboard.writeText(str)
    .then(() => {
      console.log('ID copied to clipboard ' + str);
    })
    .catch(err => {
      console.error('Failed to copy ID: ', err);
    });
}