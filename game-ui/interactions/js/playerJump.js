const purplePlayer = document.querySelector('#purple');
const purplePlayerShadow = purplePlayer.querySelector('.player-shadow');
let isJumping = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'W') {
    jumpPurplePlayer();
  }
});

function jumpPurplePlayer() {
  if (!isJumping) {
    isJumping = true;
    const initialPosition = parseFloat(getComputedStyle(purplePlayer).bottom);

    // Perform the jump animation
    const jumpDuration = 500; // Jump duration in milliseconds
    const jumpHeight = 100; // Jump height in pixels
    let startTime;

    function performJump(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const timeFactor = progress / jumpDuration;
      const easingFactor = -4 * (timeFactor ** 2) + 4 * timeFactor; // Quadratic easing

      const currentPosition = initialPosition + jumpHeight * easingFactor;
      purplePlayer.style.bottom = `${currentPosition}px`;

      // Add wobble effect
      const wobbleRotation = Math.sin(6 * Math.PI * timeFactor) * 5;
      purplePlayer.style.transform = `rotateZ(${wobbleRotation}deg)`;

      // Update shadow opacity
      purplePlayerShadow.style.opacity = 0;

      if (progress < jumpDuration) {
        requestAnimationFrame(performJump);
      } else {
        purplePlayer.style.bottom = `${initialPosition}px`;
        purplePlayer.style.transform = `rotateZ(0deg)`;
        purplePlayerShadow.style.opacity = 1;
        isJumping = false;
      }
    }

    requestAnimationFrame(performJump);
  }
}
