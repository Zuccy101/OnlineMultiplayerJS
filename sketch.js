let button;
let isHost = false; // Whether this client is the host
let peer, connection;

function setup() {
    createCanvas(400, 400);
    button = createButton('Click me!');
    button.position(150, 180);
    button.size(100, 50);
    button.style('font-size', '20px');
    button.mousePressed(changeColor);
}

function draw() {
    background(220);
}

function changeColor() {
    if (isHost) {
        button.style('background-color', 'blue');
        // Send the button state to the other player
        if (connection) {
            connection.send({ color: 'blue' });
            console.log("color blue sent!")
        }
    } else {
        button.style('background-color', 'red');
        // Send the button state to the host
        if (connection) {
            connection.send({ color: 'red' });
            console.log("color red sent!")
        }
    }
}
