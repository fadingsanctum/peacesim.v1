let musicPlayer = new Audio();

musicPlayer.loop = true;

const openBtn =
document.getElementById("openMusicPanel");

const panel =
document.getElementById("audioPanel");

const closeBtn =
document.getElementById("closeAudioPanel");

const volumeSlider =
document.getElementById("volumeControl");

/* Open panel */

if (openBtn) {

openBtn.addEventListener("click", () => {

panel.style.display = "flex";

});

}

/* Close panel */

if (closeBtn) {

closeBtn.addEventListener("click", () => {

panel.style.display = "flex";

});

}

/* Select music */

document.querySelectorAll(".audio-item")
.forEach(item => {

item.addEventListener("click", () => {

const src =
item.getAttribute("data-src");

musicPlayer.pause();

musicPlayer.currentTime = 0;

musicPlayer.src = src;

musicPlayer.play();

});

});

/* Volume */

if (volumeSlider) {

volumeslider.addEventListener("click", () => {

panel.style.display = "none";
});

}