// Central Shared Utility Infrastructure
const DriveSelectUtils = {
    // 1. Telemetry simulation log tracker
    logAnalyticsEvent: (eventName, metaData = {}) => {
        const payload = {
            event: eventName,
            timestamp: new Date().toISOString(),
            details: metaData
        };
        console.log("%c[DriveSelect Telemetry]", "color: #ff3e3e; font-weight: bold;", payload);
    },

    // 2. Local storage vehicle watchlist safe-saver helper
    toggleSavedVehicle: (carId) => {
        let watchlist = JSON.parse(localStorage.getItem("ds_watchlist")) || [];
        if (watchlist.includes(carId)) {
            watchlist = watchlist.filter(id => id !== carId);
        } else {
            watchlist.push(carId);
        }
        localStorage.setItem("ds_watchlist", JSON.stringify(watchlist));
        return watchlist;
    }
};

// Auto-trigger telemetry logging on boot
document.addEventListener("DOMContentLoaded", () => {
    DriveSelectUtils.logAnalyticsEvent("Page_Load", { URL: window.location.pathname });
});
