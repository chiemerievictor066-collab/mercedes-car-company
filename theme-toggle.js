// Local Preference UI Configuration Engine
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "🌙 Theme Switch";
    toggleBtn.id = "themeToggleNode";

    // Inline control design metrics injection
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid #ff3e3e',
        padding: '10px 15px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold'
    });

    document.body.appendChild(toggleBtn);

    // Read stored system choice configurations from the cache
    const currentTheme = localStorage.getItem("site-theme") || "light";
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode-override");
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode-override");

        let theme = "light";
        if (document.body.classList.contains("dark-mode-override")) {
            theme = "dark";
        }
        localStorage.setItem("site-theme", theme);
    });
});
