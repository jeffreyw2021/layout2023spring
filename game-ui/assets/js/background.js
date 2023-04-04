const layerTop = document.querySelector('.layer-top');
let marginLeft = 0;
const bgWidth = layerTop.offsetWidth;
let speed = 7;
let acceleration = 0.0001;
let bikeSpeed = 5.98; // meters per second

function moveBackground() {
  if (speed <= 10) {
    marginLeft -= speed;
    layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
    speed += acceleration;
    bikeSpeed = speed * 5.98 / 60;

    if (speed >= 7) {
      const purple = document.querySelector('#purple');
      purple.style.animation = 'wobble 5s infinite alternate, purpleBackForth 5s infinite linear';
    }
    if (speed >= 8) {
      const red = document.querySelector('#red');
      red.style.animation = 'wobble 5s infinite alternate, redBackForth 5s infinite linear';
    }
    if (speed >= 8.2) {
      const white = document.querySelector('#white');
      white.style.animation = 'wobble 5s infinite alternate, whiteBackForth 5s infinite linear';
    }
  }else{
    marginLeft -= speed;
    layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
    bikeSpeed = speed * 5.98 / 60;
  }
}

setInterval(moveBackground, 5);
