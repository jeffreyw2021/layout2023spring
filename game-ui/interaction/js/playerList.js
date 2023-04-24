const playerList = document.getElementById('player-list');
const helmetItems = document.querySelectorAll('.helmet-item');

const caretUp = document.querySelector('#player-list-btn .fa-caret-up');
const caretDown = document.querySelector('#player-list-btn .fa-caret-down');

caretUp.style.display = 'none';

document.getElementById('player-list-btn').addEventListener('click', function() {
    if (playerList.style.height === '40px') {
        playerList.style.height = 'auto';
        helmetItems.forEach(item => {
            item.style.opacity = '1';
            item.style.height = 'auto';
        });
        caretUp.style.display = 'flex';
        caretDown.style.display = 'none';
    } else {
        playerList.style.height = '40px';
        helmetItems.forEach(item => {
            item.style.opacity = '0';
            item.style.height = '0';
        });
        caretUp.style.display = 'none';
        caretDown.style.display = 'flex';
    }
});
