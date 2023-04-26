const layerTop = document.querySelector('.layer-top');
let marginLeft = 0;
const bgWidth = layerTop.offsetWidth;
let speed = 7;
let acceleration = 0.0001;
let bikeSpeed = 5.98; // meters per second
const needles = document.querySelectorAll('.needle');
const topSpeedElem = document.getElementById('top-speed');
const topFuelElem = document.getElementById('top-fuel');

setInterval(moveBackground, 5);

function updateNeedleRotation() {
  const minRotation = [120, -120]; // First element for second needle, second element for first needle
  const maxRotation = [-120, 120]; // First element for first needle, second element for second needle
  const minSpeed = 7;
  const maxSpeed = 10; // Updated to reflect the maximum speed value
  const rotationRange = [-240, 240]; // 240 for first needle, -240 for second needle

  // Limit the speed value to the maximum speed.
  const limitedSpeed = Math.min(speed, maxSpeed);

  for (let i = 0; i < needles.length; i++) {
    // Map the speed to the rotation range for each needle.
    const needleRotation = minRotation[i] + ((limitedSpeed - minSpeed) / (maxSpeed - minSpeed)) * rotationRange[i];

    // Apply the rotation to the needle element.
    needles[i].style.transform = `rotate(${needleRotation}deg)`;
  }
}

function calculateFuelLevel() {
  const firstNeedle = needles[0];
  const currentRotation = parseFloat(firstNeedle.style.transform.match(/rotate\((-?\d+(?:\.\d+)?)deg\)/)[1]);
  const fuelPercentage = 100 * (currentRotation + 120) / 240;
  return fuelPercentage.toFixed(2);
}

function moveBackground() {
  if (speed <= 10) {
    marginLeft -= speed;
    layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
    speed += acceleration;
    bikeSpeed = speed * 5.98 / 60;
    updateNeedleRotation();

    // Update top-speed and top-fuel
    topSpeedElem.textContent = `Speed: ${bikeSpeed.toFixed(2)} km/h`;
    topFuelElem.textContent = `Fuel level: ${calculateFuelLevel()}%`;

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
  } else {
    marginLeft -= speed;
    layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
    bikeSpeed = speed * 5.98 / 60;

    // Update top-speed and top-fuel
    topSpeedElem.textContent = `Speed: ${bikeSpeed.toFixed(2)} km/h`;
    topFuelElem.textContent = `Fuel levl: ${calculateFuelLevel()}%`;
  }
}
