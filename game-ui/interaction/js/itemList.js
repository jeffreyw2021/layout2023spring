document.addEventListener("DOMContentLoaded", function () {
    const listItemElements = document.querySelectorAll("li");
    const gameBody = document.getElementById("game-body");
    let itemSelected = false;
  
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
      }else{
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
  
    gameBody.addEventListener("click", resetSelection);
  });
  