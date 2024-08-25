
// Function to initialize PeerJS for the host
function initializeHost() {
  peer = new Peer(); // Create a new peer with a random ID
  peer.on('open', function (id) {
    console.log('Host ID: ' + id);
    isHost = true;
  });

  // Wait for a connection from a client
  peer.on('connection', function (conn) {
    connection = conn;
    console.log('Client connected');
    handleConnection();
  });
}

function initializeClient() {
  peer = new Peer(); // Create a new peer with a random ID
  peer.on('open', function (id) {
    console.log('Client ID: ' + id);
    isHost = false;
  });
}

// Function to join a room as a client
function joinRoom(hostId) {
  //peer = new Peer(); // Create a new peer
  connection = peer.connect(hostId); // Connect to the host
  connection.on('open', function () {
    console.log('Connected to host');
    handleConnection();
  });
}

// Function to handle incoming data from the connection
function handleConnection() {

  connection.on('data', function (data) {
    console.log('Received:', data);
    if (data) {
      grid[data.vec.x][data.vec.y] = data;
    }
  });

}