const musicButton = document.getElementById('music-button');
const musicPlayer = document.getElementById("music-player");
const playIcon = musicButton.querySelector(".fa-play");
const pauseIcon = musicButton.querySelector(".fa-pause");
let isPlaying = false;
let currentSong;

musicButton.addEventListener('click', function () {
  if (!isPlaying) {
    playRandomSong();
    musicButton.classList.add('active');
    pauseIcon.style.display = 'block';
    playIcon.style.display = 'none';
    isPlaying = true;
  } else {
    pauseSong();
    musicButton.classList.remove('active');
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    isPlaying = false;
  }
});

function playRandomSong() {
  const songs = ['HighwayToHell.mp3', 'BoysBackInTown.mp3'];
  const randomIndex = Math.floor(Math.random() * songs.length);
  const selectedSong = songs[randomIndex];

  if (!currentSong) {
    currentSong = new Audio(`./items/music/${selectedSong}`);
  } else {
    currentSong.src = `./items/music/${selectedSong}`;
  }

  currentSong.play();
}

function pauseSong() {
  if (currentSong) {
    currentSong.pause();
  }
}
