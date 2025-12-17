// --- LIVE CLOCKS ---
function updateTime() {
    const now = new Date();
    
    // Helper to format time as HH:MM:SS
    const format = (date) => {
        return date.toLocaleTimeString('en-GB', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });
    };

    // 1. Local Time (User's Browser)
    document.getElementById('time-local').textContent = format(now);

    // 2. New York Time (UTC-5)
    // Create date object for specific timezone
    const nyTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    document.getElementById('time-ny').textContent = format(nyTime);

    // 3. Reykjavík Time (UTC+0)
    const reykjavikTime = new Date(now.toLocaleString("en-US", {timeZone: "Atlantic/Reykjavik"}));
    document.getElementById('time-reykjavik').textContent = format(reykjavikTime);
}

// Update every second
setInterval(updateTime, 1000);
updateTime(); // Run immediately on load


// --- DARK MODE TOGGLE ---
const toggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const body = document.body;

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
} else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
}

toggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});
