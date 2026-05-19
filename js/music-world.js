const audio =
document.getElementById("audioPlayer");

const cover =
document.getElementById("cover");

const progress =
document.getElementById("progressBar");

const volume =
document.getElementById("volumeControl");

const playBtn =
document.getElementById("playBtn");

let songs =
document.querySelectorAll(".song");

let currentIndex = 0;

/* Load Song */

function loadSong(index) {

const song = songs[index];

audio.src =
song.getAttribute("data-src");

cover.src =
song.getAttribute("data-img");

}

/* Play Pause */

playBtn.onclick = () => {

if (audio.paused) {

audio.play();

playBtn.innerText = "⏸";

}

else {

audio.pause();

playBtn.innerText = "▶";

}

};


/* Progress */

audio.addEventListener("timeupdate", () => {

progress.value =
(audio.currentTime /
audio.duration) * 100;

});

/* Seek */

progress.addEventListener("input", () => {

audio.currentTime =
(progress.value / 100)

* audio.duration;

});

/* ========================== */
/* TIME DISPLAY SYSTEM */
/* ========================== */

const currentTimeDisplay =
document.getElementById("currentTime");

const durationDisplay =
document.getElementById("duration");

/* Format Time */

function formatTime(seconds) {

const minutes =
Math.floor(seconds / 60);

const secs =
Math.floor(seconds % 60)
.toString()
.padStart(2, "0");

return `${minutes}:${secs}`;

}

/* Update Duration */

audio.addEventListener("loadedmetadata", () => {

durationDisplay.innerText =
formatTime(audio.duration);

});

/* Update Current Time */

audio.addEventListener("timeupdate", () => {

currentTimeDisplay.innerText =
formatTime(audio.currentTime);

});

/* Volume */

volume.addEventListener("input", () => {

audio.volume =
volume.value;

});

/* Load first */

loadSong(0);

songs[0].classList.add("active");

function nextSong() {

currentIndex =
(currentIndex + 1) % songs.length;

loadSong(currentIndex);

audio.play();

/* Highlight */

songs.forEach(s =>
s.classList.remove("active"));

songs[currentIndex]
.classList.add("active");

/* Auto scroll */

songs[currentIndex]
.scrollIntoView({

behavior: "smooth",

block: "nearest"

});

}

function prevSong() {

currentIndex =
(currentIndex - 1 + songs.length)
% songs.length;

loadSong(currentIndex);

audio.play();

/* Highlight */

songs.forEach(s =>
s.classList.remove("active"));

songs[currentIndex]
.classList.add("active");

/* Auto scroll */

songs[currentIndex]
.scrollIntoView({

behavior: "smooth",

block: "nearest"

});

}

/* KEYBOARD CONTROLS */

document.addEventListener("keydown", (e) => {

switch (e.code) {

    /* SPACE → Play/Pause */

    case "Space":

        e.preventDefault();

        if (audio.paused) {

            audio.play();
            playBtn.innerText = "⏸";

        } else {

            audio.pause();
            playBtn.innerText = "▶";

        }

    break;


    /* RIGHT → Next */

    case "ArrowRight":

        nextSong();

    break;


    /* LEFT → Previous */

    case "ArrowLeft":

        prevSong();

    break;


    /* UP → Volume Up */

    case "ArrowUp":

        e.preventDefault();

        audio.volume =
        Math.min(audio.volume + 0.05, 1);

        volume.value =
        audio.volume;

    break;


    /* DOWN → Volume Down */

    case "ArrowDown":

        e.preventDefault();

        audio.volume =
        Math.max(audio.volume - 0.05, 0);

        volume.value =
        audio.volume;

    break;


    /* M → Mute */

    case "KeyM":

        audio.muted = !audio.muted;

    break;


    /* ENTER → Play */

    case "Enter":

        audio.play();
        playBtn.innerText = "⏸";

    break;


    /* DELETE → Stop */

    case "Delete":

        audio.pause();
        audio.currentTime = 0;
        playBtn.innerText = "▶";

    break;

}

});

audio.addEventListener("ended", () => {

nextSong();

});

songs.forEach((song, index) => {

song.addEventListener("click", () => {

currentIndex = index;

loadSong(index);

audio.play();

/* Highlight active song */

songs.forEach(s => s.classList.remove("active"));

song.classList.add("active");

/* Auto scroll to song */

song.scrollIntoView({

behavior: "smooth",

block: "nearest"

});

});

});

const volumeValue =
document.getElementById("volumeValue");

/* Volume Display */

volume.addEventListener("input", () => {

audio.volume =
volume.value;

volumeValue.innerText =
Math.round(volume.value * 100);

});