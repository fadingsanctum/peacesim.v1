/* ═══════════════════════════════════════════════
   MUSIC.JS — Simple audio panel controller
   NOTE: The main music page (music.html) uses its
   own self-contained engine. This file is kept for
   any legacy panel usage on video world pages.

   FIXES:
   • volumeSlider typo → volumeControl
   • Close button set display "flex" instead of "none"
   • Volume change listener was on wrong variable
   ═══════════════════════════════════════════════ */

var musicPlayer = new Audio();
musicPlayer.loop = true;

var openBtn      = document.getElementById('openMusicPanel');
var panel        = document.getElementById('audioPanel');
var closeBtn     = document.getElementById('closeAudioPanel');
var volumeSlider = document.getElementById('volumeControl'); // fixed: was wrong id

/* Open panel */
if (openBtn && panel) {
  openBtn.addEventListener('click', function() {
    panel.style.display = 'flex';
  });
}

/* Close panel */
if (closeBtn && panel) {
  closeBtn.addEventListener('click', function() {
    panel.style.display = 'none'; // fixed: was 'flex'
  });
}

/* Select music from panel items */
document.querySelectorAll('.audio-item').forEach(function(item) {
  item.addEventListener('click', function() {
    var src = item.getAttribute('data-src');
    if (!src) return;
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
    musicPlayer.src = src;
    musicPlayer.play().catch(function() {});
  });
});

/* Volume control */
if (volumeSlider) {
  volumeSlider.addEventListener('input', function() { // fixed: was addEventListener("click")
    musicPlayer.volume = parseFloat(volumeSlider.value);
  });
}