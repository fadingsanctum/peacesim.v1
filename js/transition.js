document.addEventListener("DOMContentLoaded", () => {
    const fadeOverlay = document.getElementById("pageFade");

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                fadeOverlay.classList.add("active");
                setTimeout(() => {
                    window.location.href = link.href;
                }, 600);
            }
        });
    });
});