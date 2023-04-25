document.addEventListener("DOMContentLoaded", function () {
  const listItemElements = document.querySelectorAll("li");
  const gameBg = document.querySelector('#game-bg');
  const purplePlayer = document.querySelector('#purple');
  let selectedItem = null;
  let itemSelected = false;
  let isExplosive = false;
  let gameBgListenerActive = false;

  listItemElements.forEach((item) => {
    item.addEventListener('click', () => {

      selectedItem = item.querySelector('img');
      const itemHeader = item.querySelector('h4');
      isExplosive = itemHeader && (itemHeader.textContent === 'Blaze Burst' || itemHeader.textContent === 'Grenade');
      selectedItem = item.querySelector('img');

      if (gameBgListenerActive) {
        gameBg.removeEventListener('click', gameBgClickListener);
      }

      const countDiv = item.querySelector(".item-desc div:last-child p:last-child");
      const currentCount = parseInt(countDiv.textContent, 10);

      if (currentCount > 1) {
        countDiv.textContent = currentCount - 1;
      } else {
        flipAndHide({ target: selectedItem });
      }
      
      gameBg.addEventListener('click', gameBgClickListener);
      gameBgListenerActive = true;
    });
  });

  function gameBgClickListener(event) {
    if (gameBgListenerActive) {
      if (selectedItem) {
        const clonedImage = selectedItem.cloneNode();
        const playerPosition = purplePlayer.getBoundingClientRect();
        const playerY = window.innerHeight - playerPosition.bottom;
        clonedImage.style.position = 'fixed';
        clonedImage.style.left = `${playerPosition.left}px`;
        clonedImage.style.bottom = `${playerY}px`;
        // clonedImage.style.height = '50px';
        // clonedImage.style.width = '50px';
        document.body.appendChild(clonedImage);

        const targetPosition = {
          x: event.clientX,
          y: window.innerHeight * 0.55,
        };
        const animationDuration = 800;
        const startTime = performance.now();

        function animateParabola(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = elapsedTime / animationDuration;
        
          if (progress < 1) {
            const x = playerPosition.left + (targetPosition.x - playerPosition.left) * progress;
            const y = playerY + (targetPosition.y - playerY) * progress + 100 * (4 * progress * (1 - progress));
            const sizeProgress = progress < 0.5 ? progress * 2 : 1;
            const size = sizeProgress * 50;
            clonedImage.style.height = `${size}px`;
            clonedImage.style.width = `${size}px`;
            clonedImage.style.left = `${x}px`;
            clonedImage.style.bottom = `${y}px`;
            requestAnimationFrame(animateParabola);
        
          } else {
            document.body.removeChild(clonedImage);
            if (isExplosive || isGrenade) {
              showExplosion(targetPosition.x, targetPosition.y);
            }
            selectedItem = null;
            resetSelection();
          }
        }                      
        requestAnimationFrame(animateParabola);
      }
      gameBg.removeEventListener('click', gameBgClickListener);
      gameBgListenerActive = false;
    }
  }

  function showExplosion(x, y) {
    const explosionImage = document.createElement('div');
    explosionImage.style.backgroundImage = 'url(./items/effect/explosion.gif)';
    explosionImage.style.backgroundSize = 'cover';
    explosionImage.style.position = 'fixed';
    explosionImage.style.left = `${x - 100}px`;
    explosionImage.style.bottom = `55%`;
    explosionImage.style.zIndex = 80;
    explosionImage.style.height = '200px';
    explosionImage.style.width = '200px';

    // Add brightness and drop-shadow filters for light and shadow effects
    explosionImage.style.filter = 'brightness(1.2) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))';

    document.body.appendChild(explosionImage);

    setTimeout(() => {
      document.body.removeChild(explosionImage);
    }, 800);
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
    li.removeEventListener("click", flipAndHide); // Removed this event listener as it's no longer needed
  });
});
