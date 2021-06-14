const deviceIdIndicator = document.getElementById('device-id');

/* Changing slides */

let slideNumber = 1;

const changeSlide = (newSlideNumber) => {
  slideNumber = newSlideNumber;
  const elems = document.getElementsByClassName('slide-number')
  for (let i = 0; i < elems.length; i++) {
    elems[i].innerHTML = newSlideNumber;
  }
}

const prevSlide = () => slideNumber > 1 ? changeSlide(slideNumber - 1) : null;
const nextSlide = () => changeSlide(slideNumber + 1);

/* WebRTC stuff */

const peerId = ''+Math.floor(Math.random()*2**18).toString(36).padStart(4,0);

const peer = new Peer(peerId, {
  host: location.hostname,
  debug: 1,
  path: '/myapp'
});

window.peer = peer;

peer.on('open', function () {
  deviceIdIndicator.textContent = `Your device ID is: ${peer.id}`;
});

peer.on('connection', dataConnection => {
  dataConnection.on('data', data => {
    if (data === "prev") {
      prevSlide();
    } else if (data === "next") {
      nextSlide();
    }
  })
})