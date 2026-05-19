// Define playlists based on your folder structure
const allPlaylists = {
    fantasy: [
        { src: "videos/fantasy/fantasy1.mp4", name: "Mystic Forest" },
        { src: "videos/fantasy/fantasy2.mp4", name: "Floating Isles" },
        { src: "videos/fantasy/fantasy3.mp4", name: "Crystal Lake" },
        { src: "videos/fantasy/fantasy4.mp4", name: "Ancient Temple" },
        { src: "videos/fantasy/fantasy5.mp4", name: "Star Realm" }
    ],
    peace: [
        { src: "videos/peace/peace1.mp4", name: "Zen Morning" },
        { src: "videos/peace/peace2.mp4", name: "Rainy Forest" },
        { src: "videos/peace/peace3.mp4", name: "Ocean Waves" },
        { src: "videos/peace/peace4.mp4", name: "Mountain Wind" },
        { src: "videos/peace/peace5.mp4", name: "Midnight Rain" }
    ]
};

// Auto-detect which playlist to use based on the HTML filename
let currentPlaylist = allPlaylists.fantasy; // Default
const path = window.location.pathname;
if (path.includes("peace.html")) {
    currentPlaylist = allPlaylists.peace;
} else if (path.includes("nostalgic.html") || path.includes("dark.html")) {
    // Both share the fantasy folder per your original code
    currentPlaylist = allPlaylists.fantasy;
}

let currentVideoIndex = 0;
let videoPlayer;
let videoNameDisplay;

document.addEventListener("DOMContentLoaded", () => {
    videoPlayer = document.getElementById("bgVideo");
    videoNameDisplay = document.getElementById("videoName");

    if (videoPlayer) {
        updateVideoSource();
        
        // Loop to next video automatically
        videoPlayer.onended = () => nextVideo();

        // Keyboard Controls
document.addEventListener("keydown", (e) => {

    /* PLAY / PAUSE */
    if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
    }

    /* NEXT VIDEO */
    if (e.code === "ArrowRight") {
        nextVideo();
    }

    /* PREVIOUS VIDEO */
    if (e.code === "ArrowLeft") {
        prevVideo();
    }

    /* FULLSCREEN (F key) */
    if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
    }

    /* LOCK / UNLOCK (L key 🔒) */
    if (e.key.toLowerCase() === "l") {
        toggleLock();
    }

});

function updateVideoSource() {
    if (!videoPlayer) return;

    videoPlayer.src = currentPlaylist[currentVideoIndex].src;
    videoPlayer.load();
    
    if (videoNameDisplay) {
        videoNameDisplay.innerText = currentPlaylist[currentVideoIndex].name;
    }

    // Attempt to play (handles browser autoplay restrictions)
    videoPlayer.play().catch(() => {
        const btn = document.getElementById("playBtn");
        if (btn) btn.innerText = "▶"; 
    });
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % currentPlaylist.length;
    updateVideoSource();
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    updateVideoSource();
}

function togglePlay() {
    const btn = document.getElementById("playBtn");
    if (videoPlayer.paused) {
        videoPlayer.play();
        if (btn) btn.innerText = "停"; // Matches your UI needs or use "⏸"
    } else {
        videoPlayer.pause();
        if (btn) btn.innerText = "播"; // Or "▶"
    }
}

document.addEventListener("click", () => {

const video =
document.getElementById("bgVideo");

if (video.requestFullscreen) {

video.requestFullscreen();

}

}, { once: true });