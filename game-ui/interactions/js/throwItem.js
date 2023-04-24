const offensiveItems = document.querySelectorAll('.offensive');
const gameBg = document.querySelector('#game-body');
const purplePlayer = document.querySelector('#purple');
let selectedItem = null;

// Add click event listeners to offensive items
offensiveItems.forEach((item) => {
  item.addEventListener('click', () => {
    selectedItem = item.querySelector('img');
  });
});

// Add click event listener to the game-bg
gameBg.addEventListener('click', (event) => {
  if (selectedItem) {
    // Clone the selected image and position it at the purple player
    const clonedImage = selectedItem.cloneNode();
    const playerPosition = purplePlayer.getBoundingClientRect();
    clonedImage.style.position = 'fixed';
    clonedImage.style.left = `${playerPosition.left}px`;
    clonedImage.style.bottom = `${playerPosition.bottom}px`;
    clonedImage.style.height = '15px';
    clonedImage.style.width = '15px';
    document.body.appendChild(clonedImage);

    // Calculate the parabolic trajectory
    const targetPosition = {
      x: event.clientX,
      y: window.innerHeight - event.clientY,
    };
    const animationDuration = 5000;
    const startTime = performance.now();

    function animateParabola(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = elapsedTime / animationDuration;

      if (progress < 1) {
        const x = playerPosition.left + (targetPosition.x - playerPosition.left) * progress;
        const y = playerPosition.bottom + (targetPosition.y - playerPosition.bottom) * progress - 100 * (4 * progress * (1 - progress));
        clonedImage.style.left = `${x}px`;
        clonedImage.style.bottom = `${y}px`;
        requestAnimationFrame(animateParabola);
      } else {
        selectedItem = null;
      }
    }

    requestAnimationFrame(animateParabola);
  }
});
