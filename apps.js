const liveRooms = [
    {
        title: "Late Night Vibes with Kemi",
        category: "music",
        viewers: 49200,
        host: "Kemi",
        emoji: "🎵",
        badge: "LIVE"
    },
    {
        title: "Valorant grind with the squad",
        category: "gaming",
        viewers: 35100,
        host: "Zee",
        emoji: "🎮",
        badge: "LIVE"
    },
    {
        title: "Truth talk and relationship advice",
        category: "talk",
        viewers: 28700,
        host: "Amara",
        emoji: "💬",
        badge: "LIVE"
    },
    {
        title: "Streetwear drop and fit checks",
        category: "fashion",
        viewers: 22300,
        host: "Lola",
        emoji: "👗",
        badge: "LIVE"
    },
    {
        title: "Creator workshop and monetization",
        category: "business",
        viewers: 18900,
        host: "Jude",
        emoji: "💼",
        badge: "LIVE"
    },
    {
        title: "Amapiano energy on the mic",
        category: "music",
        viewers: 34200,
        host: "Ife",
        emoji: "🎧",
        badge: "LIVE"
    },
    {
        title: "Ask me anything tonight",
        category: "talk",
        viewers: 26100,
        host: "Mia",
        emoji: "✨",
        badge: "LIVE"
    },
    {
        title: "Elite gaming highlights and tips",
        category: "gaming",
        viewers: 40300,
        host: "Kris",
        emoji: "🔥",
        badge: "LIVE"
    }
];

const liveGrid = document.getElementById("liveGrid");
const filters = document.querySelectorAll(".filter");

function formatViewers(num) {
    return `${Math.round(num / 1000)}K`;
}

function renderRooms(filter = "all") {
    if (!liveGrid) return;

    const filtered = filter === "all"
        ? liveRooms
        : liveRooms.filter((room) => room.category === filter);

    liveGrid.innerHTML = filtered.map((room) => `
    <article class="live-card">
      <div class="live-media">
        <span class="live-badge">${room.badge}</span>
        <span class="viewer-count">👁 ${formatViewers(room.viewers)}</span>
        <span>${room.emoji}</span>
      </div>

      <div class="live-body">
        <div class="host-row">
          <div class="host-avatar">${room.host.charAt(0)}</div>
          <div>
            <div class="host-name">${room.host}</div>
            <div class="live-category">${room.category}</div>
          </div>
        </div>

        <div class="live-title">${room.title}</div>

        <button class="enter-btn" type="button">Enter room</button>
      </div>
    </article>
  `).join("");
}

if (filters.length) {
    filters.forEach((button) => {
        button.addEventListener("click", () => {
            filters.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            renderRooms(button.dataset.filter);
        });
    });
}

renderRooms();