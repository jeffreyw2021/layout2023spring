const operationBody = document.getElementById('operation-body');
const dragBar = operationBody.children[0];
const dragBarBtn = dragBar.children[0];
const gameBg = document.getElementById('game-bg');
let opDefaultHeight =50;
const upIcon = document.getElementById('upIcon');
const downIcon = document.getElementById('downIcon');

// Define an array of folders containing the background assets
const folders = ['cave', 'arctic', 'arsenal'];
// Choose a random folder from the array
const folder = folders[Math.floor(Math.random() * folders.length)];
// Assign the background image to the game-bg div
gameBg.style.backgroundImage = `url('./assets/background/${folder}/bg.png')`;

function setCursor(cursor) {
    dragBar.style.cursor = cursor;
}

function resizeOperationBody(newHeight) {
    // Check if the new height is within the allowed range
    const minHeight = 60; // Minimum height in pixels
    const maxHeight = window.innerHeight;
    if (newHeight > maxHeight) {
        // Set the new height to the maximum height
        operationBody.style.height = `${maxHeight}px`;
    } else if (newHeight < minHeight) {
        // Set the new height to the minimum height
        operationBody.style.height = `${minHeight}px`;
    } else {
        // Update the height of the div
        operationBody.style.height = `${newHeight}px`;
        // Update the margin of the game bg
        const gameBgHeight = window.innerHeight - newHeight;
        gameBg.style.height = `${gameBgHeight}px`;

        // Show/hide the up and down icons based on the height of the operationBody
        const opDefaultHeightPx = window.innerHeight * (opDefaultHeight / 100);
        if (newHeight >= opDefaultHeightPx) {
            upIcon.style.display = 'none';
            downIcon.style.display = 'block';
        } else {
            upIcon.style.display = 'block';
            downIcon.style.display = 'none';
        }
    }
}

dragBar.addEventListener('mouseenter', function () {
    setCursor('grab');
});

dragBar.addEventListener('mouseleave', function () {
    setCursor('auto');
});

dragBar.addEventListener('mousedown', function (event) {
    // Get the initial mouse position and height of the div
    const startY = event.clientY;
    const startHeight = parseInt(getComputedStyle(operationBody).height);

    // Remove the transition effect
    operationBody.style.transition = 'none';
    gameBg.style.transition = 'margin-bottom 0s ease';

    // Add mousemove event listener to track the mouse movement
    document.addEventListener('mousemove', resizeDiv);

    // Add mouseup event listener to stop tracking the mouse movement
    document.addEventListener('mouseup', stopResizeDiv);

    // Set the cursor to a grabbing hand
    setCursor('grabbing');

    function resizeDiv(event) {
        // Calculate the new height of the div based on the mouse movement
        const newHeight = startHeight + (startY - event.clientY);

        resizeOperationBody(newHeight);

        // Update the height of gameBg
        const gameBgHeight = window.innerHeight - newHeight;
        gameBg.style.height = `${gameBgHeight}px`;
    }

    function stopResizeDiv() {
        // Add the transition effect back
        operationBody.style.transition = 'height 0.3s ease';
        gameBg.style.transition = 'margin-bottom 0.3s ease';

        // Remove the mousemove and mouseup event listeners
        document.removeEventListener('mousemove', resizeDiv);
        document.removeEventListener('mouseup', stopResizeDiv);

        // Reset the cursor to the default if the mouse button is not pressed
        if (!event.buttons) {
            setCursor('auto');
        }
    }
});

dragBarBtn.addEventListener('click', function (event) {
    // Set the height to 50vh with the transition effect
    operationBody.style.transition = 'height 0.3s ease';
    operationBody.style.height = opDefaultHeight + 'vh';
    gameBg.style.transition = 'height 0.3s ease';
    gameBg.style.height = `calc(100vh - ${opDefaultHeight}vh)`;
});

