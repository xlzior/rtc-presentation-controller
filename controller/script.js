const connectButton = document.getElementById('connect-button');

const container = document.getElementById('container')
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

function showControls() {
  connectButton.hidden = true;
  prevButton.hidden = false;
  nextButton.hidden = false;
}

/* WebRTC stuff */

const peerId = ''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0);

const peer = new Peer(peerId, {
  host: location.hostname,
  debug: 1,
  path: '/myapp'
});

window.peer = peer;

let code;
function getStreamCode() {
  code = window.prompt('Please enter the sharing code');
}

let conn;
function connectPeers() {
  conn = peer.connect(code);
}

let dataConnection;
peer.on('connection', function (connection) {
  conn = connection;
});

connectButton.addEventListener('click', () => {
  getStreamCode();
  connectPeers();

  dataConnection = peer.connect(code);
  dataConnection.on('open', () => {
    showControls();
  })
  dataConnection.on('error', error => {
    console.error(error);
  })
})

prevButton.addEventListener('click', () => {
  dataConnection.send('prev')
})

nextButton.addEventListener('click', () => {
  dataConnection.send('next')
})