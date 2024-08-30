let maxPlayers = 1;
let connectedPlayers = 0;

// Function to initialize PeerJS for the host
function initializeHost() {
  clientid.html("");
  peer = new Peer(1234); // Create a new peer with a random ID
  peer.on('open', function (id) {
    hostid.html(id);
    console.log('Host ID: ' + id);
    isHost = true;
  });

  // Wait for a connection from a client
  peer.on('connection', function (conn) {

    if (connectedPlayers < maxPlayers) {
      connectedPlayers++;
      connection = conn;
      state = "Match started! Client goes first";
      console.log('Client connected');
      handleConnection();

      conn.on('close', function () {
        connectedPlayers--;
        state = "Waiting for match to start...";
        console.log('Client disconnected');
        //connection.send({ err: "Disconnected from host" })
        setupGrid();
      });
    } 
    else {
      console.log('Game is full, 1 connection rejected');
      conn.close(); // Reject additional connections
    }

  });

  peer.on('connection', function (conn) {
  });
}

function initializeClient() {
  hostid.html("");
  peer = new Peer(); // Create a new peer with a random ID
  peer.on('open', function (id) {
    clientid.html(id);
    console.log('Client ID: ' + id);
    isHost = false;
  });
}

// Function to join a room as a client
function joinRoom(hostId) {
  connection = peer.connect(hostId); // Connect to the host
  connection.on('open', function () {
    state = "Match started! Client goes first";
    console.log('Connected to host');
    handleConnection();
  });

  connection.on('close', function () {
    console.log('Disconnected from host');
    //connection.send({ err: "Client disconnected" })
    state = "Waiting for match to start...";
    setupGrid();
  });
}

function handleConnection() {
  connection.on('data', function (data) {
    if (isValidMove(data)) {
      console.log(data);
      grid[data.box.vecx][data.box.vecy].id = data.box.id;
      validateWinner();
      turn = data.turn;
    } 
    else {
      console.error('Invalid move received:', data);
    }
  });
}

function isValidMove(data) {
  let expectedTurn;
  if (turn == 0) {
    expectedTurn = 1;
  } 
  else if (turn == 1) {
    expectedTurn = 0;
  }

  return (
    data.box.vecx >= 0 && 
    data.box.vecx < 3 && 
    data.box.vecy >= 0 && 
    data.box.vecy < 3 && 
    grid[data.box.vecx][data.box.vecy].id === 0 &&
    data.turn == expectedTurn
  );
}