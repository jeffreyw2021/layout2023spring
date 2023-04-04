const layerTop = document.querySelector('.layer-top');
let marginLeft = 0;
const bgWidth = layerTop.offsetWidth;
let speed = 1;
let acceleration = 0.0001;
let bikeSpeed = 5.98; // meters per second

function moveBackground() {
  marginLeft -= speed;
  layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
  speed += acceleration;
  bikeSpeed = speed * 5.98 / 60;
}

setInterval(moveBackground, 5);