console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif1 = document.getElementById('gif1');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Hass Hass", filePath: "1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Too Much", filePath: "2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Greedy", filePath: "3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Vampire", filePath: "4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Water", filePath: "5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Heavy Hitters", filePath: "6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Needle", filePath: "7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Paris", filePath: "8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Over Mind", filePath: "9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Don't Need To", filePath: "10.mp3", coverPath: "covers/10.jpg" },
];

// Update song items in the UI
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.add('fa-pause-circle');
        gif1.style.opacity = 1;
    } else {
        audioElement.pause();
        gif1.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
    }
});

// Seek bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play song from list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif1.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// Next song
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Automatically play next song
audioElement.addEventListener('ended', () => {
    document.getElementById('next').click();
});
