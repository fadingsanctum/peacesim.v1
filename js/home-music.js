const music = document.getElementById("bgMusic");
const toggleBtn = document.getElementById("musicToggle");

/* Remember mute state */
let isMuted = localStorage.getItem("musicMuted") === "true";

/* Start music on first click */
document.addEventListener("click", () => {
    if (music.paused && !isMuted) {
        music.volume = 0.4;
        music.play().catch(() => {});
    }
}, { once: true });

/* Toggle Music */
toggleBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        toggleBtn.innerText = "🔊";
        isMuted = false;
    } else {
        music.pause();
        toggleBtn.innerText = "🔇";
        isMuted = true;
    }
    localStorage.setItem("musicMuted", isMuted);
});

/* Apply saved state */
if (isMuted) {
    toggleBtn.innerText = "🔇";
}

const menuBtn =
document.getElementById("menuToggle");

const sidebar =
document.querySelector(".sidebar");

if (menuBtn && sidebar) {

menuBtn.addEventListener("click", () => {

sidebar.classList.toggle("active");

});

}

document.addEventListener("click", (e) => {

if (

sidebar.classList.contains("active") &&

!sidebar.contains(e.target) &&

!menuBtn.contains(e.target)

) {

sidebar.classList.remove("active");

}

});

