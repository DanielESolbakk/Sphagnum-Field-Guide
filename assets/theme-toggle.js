(function () {
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;
    const metaTheme = document.getElementById('meta-theme-color');

    function apply(theme, persist = true) {
        root.setAttribute('data-theme', theme);
        if (persist) localStorage.setItem(STORAGE_KEY, theme);
        updateButton(theme);
        if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#111111' : '#ffffff');
    }

    function preferred() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function initTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        apply(saved === 'light' || saved === 'dark' ? saved : preferred(), false);
    }

    function toggle() {
        const current = root.getAttribute('data-theme') || preferred();
        apply(current === 'dark' ? 'light' : 'dark');
    }

    function updateButton(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const dark = theme === 'dark';
        btn.setAttribute('aria-pressed', String(dark));
        btn.textContent = dark ? 'Light mode' : 'Dark mode';
    }

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.addEventListener('click', toggle);
    });
})();