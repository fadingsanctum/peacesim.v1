/* ═══════════════════════════════════════════════
   HOME MUSIC — Background music + sidebar toggle
   ═══════════════════════════════════════════════ */

var music     = document.getElementById('bgMusic');
var toggleBtn = document.getElementById('musicToggle');
var menuBtn   = document.getElementById('menuToggle');
var sidebar   = document.querySelector('.sidebar');
var overlay   = document.getElementById('sidebarOverlay');

/* ── Saved mute state ── */
var isMuted = localStorage.getItem('musicMuted') === 'true';

/* Apply saved mute icon immediately on load */
if (toggleBtn) {
  toggleBtn.textContent = isMuted ? '🔇' : '🔊';
}

/* Start music on first user interaction (satisfies autoplay policy) */
var musicStarted = false;
function tryStartMusic() {
  if (musicStarted || !music || isMuted) return;
  musicStarted = true;
  music.volume = 0.4;
  music.play().catch(function() {});
}
document.addEventListener('click', tryStartMusic, { once: true });
document.addEventListener('touchstart', tryStartMusic, { once: true });

/* Toggle music on/off */
if (toggleBtn && music) {
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (music.paused) {
      music.volume = 0.4;
      music.play().catch(function() {});
      toggleBtn.textContent = '🔊';
      isMuted = false;
      musicStarted = true;
    } else {
      music.pause();
      toggleBtn.textContent = '🔇';
      isMuted = true;
    }
    localStorage.setItem('musicMuted', isMuted);
  });
}

/* ── Sidebar helpers ── */
function isMobileLayout() {
  return window.innerWidth <= 1024;
}

function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('active');
  if (overlay && isMobileLayout()) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
  }
}

function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
}

/* Menu button click */
if (menuBtn && sidebar) {
  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (sidebar.classList.contains('active')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

/* Close when clicking the dim overlay */
if (overlay) {
  overlay.addEventListener('click', closeSidebar);
}

/* Close when clicking outside sidebar on mobile */
document.addEventListener('click', function(e) {
  if (!isMobileLayout()) return;
  if (
    sidebar &&
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    menuBtn && !menuBtn.contains(e.target)
  ) {
    closeSidebar();
  }
});

/* Close on Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
    closeSidebar();
    if (menuBtn) menuBtn.focus();
  }
});

/* On resize to desktop: remove mobile state */
window.addEventListener('resize', function() {
  if (!isMobileLayout() && sidebar) {
    sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});