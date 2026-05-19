const themes = [
"dark",
"sunset",
"night",
"nature",
"ocean",
"cyberpunk",
"forest",
"midnight",
"lava",
"aurora"
];
const btn = document.getElementById("themeToggle");

/* Apply Saved Theme */
const savedTheme = localStorage.getItem("theme");
let currentTheme = 0;

if (savedTheme && themes.includes(savedTheme)) {
    document.body.className = savedTheme;
    currentTheme = themes.indexOf(savedTheme);
}

/* Switch Theme */
btn.addEventListener("click", () => {
    currentTheme = (currentTheme + 1) % themes.length;
    const themeName = themes[currentTheme];
    
    document.body.className = themeName;
    localStorage.setItem("theme", themeName);
});