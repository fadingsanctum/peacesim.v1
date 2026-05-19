const videoList = [
    { src: "videos/nostalgic/n1.m3u8", name: "Fading Gold" },
    { src: "videos/nostalgic/n2.m3u8", name: "Storm of Memories" },
    { src: "videos/nostalgic/n3.m3u8", name: "Memory Lane" },
    { src: "videos/nostalgic/n4.m3u8", name: "Forgotten winds" },
    { src: "videos/nostalgic/n5.m3u8", name: "waving smiles" }
];

let currentVideo = 0;
let videoPlayer;
let videoNameDisplay;

document.addEventListener("DOMContentLoaded", function () {
    videoPlayer = document.getElementById("bgVideo");
    videoNameDisplay = document.getElementById("videoName");

/* ========================= */
/* LOADER HIDE WHEN VIDEO STARTS */
/* ========================= */

videoPlayer.addEventListener("playing", () => {

const loader =
document.getElementById("loader");

if (loader) {

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

}, 600);

}

});

/* ========================= */
/* PRELOAD FIRST VIDEO */
/* ========================= */

const firstVideo = videoList[0].src;

const preloadLink = document.createElement("link");

preloadLink.rel = "preload";

/* If using .m3u8 */
preloadLink.as = "fetch";

preloadLink.href = firstVideo;

document.head.appendChild(preloadLink);

    if (videoPlayer) {
        updateUI();
        videoPlayer.onended = () => nextVideo();
    }

    // KEYBOARD CONTROLS
    document.addEventListener("keydown", (e) => {
        // Space to Play/Pause
        if (e.code === "Space") {
            e.preventDefault(); // Prevents page jumping
            togglePlay();
        }
        // Arrows to change video
        if (e.code === "ArrowRight") {
            nextVideo();
        }
        if (e.code === "ArrowLeft") {
            prevVideo();
        }

    /* LOCK / UNLOCK (L key 🔒) */
    if (e.key.toLowerCase() === "l") {
        toggleLock();
    }

// F → Fullscreen toggle
if (e.code === "KeyF") {

toggleFullscreen();

}
    });
});

function updateUI() {

if (!videoPlayer) return;

videoPlayer.pause();

setTimeout(() => {

const src = videoList[currentVideo].src;

/* HLS Support */

if (src.endsWith(".m3u8") && Hls.isSupported()) {

const hls = new Hls();

hls.loadSource(src);

hls.attachMedia(videoPlayer);

}
else {

videoPlayer.src = src;

}

videoPlayer.load();

videoPlayer.play().catch(() => {});

videoNameDisplay.innerText =
videoList[currentVideo].name;

/* Preload next video */

const nextIndex =
(currentVideo + 1)
% videoList.length;

const preloadVideo =
document.createElement("video");

preloadVideo.src =
videoList[nextIndex].src;

preloadVideo.preload = "metadata";

}, 800);

}

function nextVideo() {
    currentVideo = (currentVideo + 1) % videoList.length;
    updateUI();
}

function prevVideo() {
    currentVideo = (currentVideo - 1 + videoList.length) % videoList.length;
    updateUI();
}

function togglePlay() {
    const btn = document.getElementById("playBtn");
    if (videoPlayer.paused) {
        videoPlayer.play();
        if (btn) btn.innerText = "⏸";
    } else {
        videoPlayer.pause();
        if (btn) btn.innerText = "▶";
    }
}

function toggleFullscreen() {

if (!document.fullscreenElement) {

document.documentElement.requestFullscreen();

} else {

if (document.exitFullscreen) {

document.exitFullscreen();

}

}

}

function toggleFullscreen() {

const btn =
document.getElementById("fullscreenBtn");

if (!document.fullscreenElement) {

document.documentElement.requestFullscreen();

if (btn) btn.innerText = "🡽";

} else {

document.exitFullscreen();

if (btn) btn.innerText = "⛶";

}

}

/* ========================= */
/* LOCK MODE SYSTEM */
/* ========================= */

function toggleLock() {

document.body.classList.toggle("locked");

const lockBtn =
document.getElementById("lockBtn");

if (document.body.classList.contains("locked")) {

lockBtn.innerText = "🔓";

} else {

lockBtn.innerText = "🔒";

}

}

/* ========================= */
/* SMART LOCK SYSTEM */
/* ========================= */

const unlockBtn =
document.getElementById("unlockBtn");

function toggleLock() {

document.body.classList.toggle("locked");

/* Hide unlock when unlocked */

if (!document.body.classList.contains("locked")) {

unlockBtn.classList.remove("show");

}

}

/* Show unlock when tapping screen */

document.addEventListener("click", (e) => {

if (document.body.classList.contains("locked")) {

/* Prevent instant unlock click */

if (e.target.id !== "unlockBtn") {

unlockBtn.classList.add("show");

/* Auto hide after 3 sec */

setTimeout(() => {

unlockBtn.classList.remove("show");

}, 3000);

}

}

});