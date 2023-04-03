
const layerTop = document.querySelector('.layer-top');
let marginLeft = 0;
const bgWidth = layerTop.offsetWidth;

function moveBackground() {
    marginLeft--;
    layerTop.style.backgroundPosition = `${marginLeft}px bottom`;
}

setInterval(moveBackground, 8);