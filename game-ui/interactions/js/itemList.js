document.addEventListener("DOMContentLoaded", function () {
  const listItemElements = document.querySelectorAll("li");
  const gameBg = document.querySelector('#game-bg');
  const purplePlayer = document.querySelector('#purple');
  let selectedItem = null;
  let itemSelected = false;
  let isBlazeBurst = false;
  let isGrenade = false;

  listItemElements.forEach((item) => {
    item.addEventListener('click', () => {
      if (!itemSelected && (item.classList.contains("offensive") || item.classList.contains("roadblock")) && item.querySelector('img')) {
        const itemHeader = item.querySelector('h4');
        isBlazeBurst = itemHeader && itemHeader.textContent === 'Blaze Burst';
        isGrenade = itemHeader && itemHeader.textContent === 'Grenade';
        selectedItem = item.querySelector('img');
        flipAndHide({ target: selectedItem });
      } else {
        selectedItem = null;
      }
    });
  });

  gameBg.addEventListener('click', (event) => {
    if (selectedItem) {
      const clonedImage = selectedItem.cloneNode();
      const playerPosition = purplePlayer.getBoundingClientRect();
      const playerY = window.innerHeight - playerPosition.bottom;
      clonedImage.style.position = 'fixed';
      clonedImage.style.left = `${playerPosition.left}px`;
      clonedImage.style.bottom = `${playerY}px`;
      clonedImage.style.height = '50px';
      clonedImage.style.width = '50px';
      document.body.appendChild(clonedImage);

      const targetPosition = {
        x: event.clientX,
        y: window.innerHeight - event.clientY,
      };
      const animationDuration = 800;
      const startTime = performance.now();

      function animateParabola(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = elapsedTime / animationDuration;

        if (progress < 1) {
          const x = playerPosition.left + (targetPosition.x - playerPosition.left) * progress;
          const y = playerY + (targetPosition.y - playerY) * progress + 100 * (4 * progress * (1 - progress));
          clonedImage.style.left = `${x}px`;
          clonedImage.style.bottom = `${y}px`;
          requestAnimationFrame(animateParabola);
        } else {
          document.body.removeChild(clonedImage);
          if (isBlazeBurst || isGrenade) {
            showExplosion(targetPosition.x, targetPosition.y);
          }
          selectedItem = null;
          resetSelection();
        }
      }

      requestAnimationFrame(animateParabola);
    }
  });

  function showExplosion(x, y) {
    const explosionImage = document.createElement('img');
    explosionImage.src = './items/effect/explosion.png';
    explosionImage.style.position = 'fixed';
    explosionImage.style.left = `${x-100}px`;
    explosionImage.style.bottom = `${y-100}px`;
    explosionImage.style.zIndex = 1000;
    explosionImage.style.height = '200px';
    explosionImage.style.width = '200px';
    document.body.appendChild(explosionImage);
  
    setTimeout(() => {
      document.body.removeChild(explosionImage);
    }, 1000);
  }  

  function flipAndHide(event) {
    if (itemSelected) return;

    const liElement = event.target.closest("li");

    if (liElement && (liElement.classList.contains("offensive") || liElement.classList.contains("roadblock"))) {
      itemSelected = true;
      liElement.style.transform = "rotateX(90deg)";
      liElement.style.transition = "transform 0.2s, height 0.2s, margin 0.2s, opacity 0.2s";
      liElement.style.opacity = "0";

      setTimeout(() => {
        liElement.style.height = "0";
        liElement.style.marginTop = "0";
        liElement.style.marginBottom = "0";
      }, 200);

      setTimeout(() => {
        liElement.style.display = "none";
      }, 400);

      document.body.style.cursor = "crosshair";
    }
  }

  function resetSelection(event) {
    if (itemSelected) {
      itemSelected = false;
      document.body.style.cursor = "";
    }
  }

  listItemElements.forEach((li) => {
    li.addEventListener("click", flipAndHide);
  });
});
