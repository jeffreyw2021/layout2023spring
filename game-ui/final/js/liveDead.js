// select all the live and dead icons
const liveIcons = document.querySelectorAll('.live-icon');
const deadIcons = document.querySelectorAll('.dead-icon');
var clickCount = 0;
var backToLive = false;

// set up event listener for the "x" key
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyX') {
        if (clickCount == 4) {
            backToLive = true;
        }
        if (clickCount == 0) {
            backToLive = false;
        }
        if (clickCount < 4 && backToLive == false) {
            for (let i = liveIcons.length - 1; i >= 0; i--) {
                const liveIcon = liveIcons[i];
                const deadIcon = deadIcons[i];
                if (liveIcon.style.display !== 'none') {
                    liveIcon.style.display = 'none';
                    deadIcon.style.display = 'block';
                    break;
                }
            }
            clickCount++;
        }
        if (clickCount >= 0 && backToLive == true) {
            for (let i = 0; i <= deadIcons.length - 1; i++) {
                const liveIcon = liveIcons[i];
                const deadIcon = deadIcons[i];
                if (deadIcon.style.display !== 'none') {
                    liveIcon.style.display = 'block';
                    deadIcon.style.display = 'none';
                    break;
                }
            }
            clickCount--;
        }
    }
});

// select all the live and dead icons
const liveIconssm = document.querySelectorAll('.live-icon-sm');
const deadIconssm = document.querySelectorAll('.dead-icon-sm');
var smclickCount = 0;
var smbackToLive = false;

// set up event listener for the "x" key
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyX') {
        if (smclickCount == 4) {
            smbackToLive = true;
        }
        if (smclickCount == 0) {
            smbackToLive = false;
        }
        if (smclickCount < 4 && smbackToLive == false) {
            for (let i = liveIconssm.length - 1; i >= 0; i--) {
                const liveIcon = liveIconssm[i];
                const deadIcon = deadIconssm[i];
                if (liveIcon.style.display !== 'none') {
                    liveIcon.style.display = 'none';
                    deadIcon.style.display = 'block';
                    break;
                }
            }
            smclickCount++;
        }
        if (smclickCount >= 0 && smbackToLive == true) {
            for (let i = 0; i <= deadIconssm.length - 1; i++) {
                const liveIcon = liveIconssm[i];
                const deadIcon = deadIconssm[i];
                if (deadIcon.style.display !== 'none') {
                    liveIcon.style.display = 'block';
                    deadIcon.style.display = 'none';
                    break;
                }
            }
            smclickCount--;
        }
    }
});