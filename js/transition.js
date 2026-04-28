/* ═══════════════════════════════════════════════
   TRANSITION — Page fade-out on internal links
   FIX: Guard against missing #pageFade element
        (video pages don't have it).
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
  var fadeOverlay = document.getElementById('pageFade');

  // If there's no fade overlay on this page, do nothing
  if (!fadeOverlay) return;

  document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      // Only intercept same-origin links that open in the same tab
      if (
        link.hostname === window.location.hostname &&
        !link.target &&
        link.href &&
        link.href !== window.location.href + '#' &&
        !link.href.startsWith('mailto:') &&
        !link.href.startsWith('tel:')
      ) {
        e.preventDefault();
        var dest = link.href;
        fadeOverlay.classList.add('active');
        setTimeout(function() {
          window.location.href = dest;
        }, 600);
      }
    });
  });
});