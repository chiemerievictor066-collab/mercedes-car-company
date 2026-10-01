// Central database for your dealership inventory with active imagery links
const CAR_INVENTORY = [
    {
        id: 1,
        name: "Grand Touring Sedan",
        category: "sedan",
        price: 72000000, // Base price in NGN
        img: "https://unsplash.com",
        transmission: "Automatic",
        mileage: "12,000 miles",
        fuel: "Petrol"
    },
    {
        id: 2,
        name: "Adventure Terrain SUV",
        category: "suv",
        price: 93600000,
        img: "https://unsplash.com",
        transmission: "4WD",
        mileage: "5,500 miles",
        fuel: "Diesel"
    },
    {
        id: 3,
        name: "Apex Evolution Sport",
        category: "sports",
        price: 142400000,
        img: "https://unsplash.com",
        transmission: "Manual",
        mileage: "1,200 miles",
        fuel: "Petrol"
    }
];

// LIVE EXCHANGE RATE ARCHITECTURE
let FX_CONVERSION_RATE = 1600; // Safe local fallback factor
let CURRENT_ACTIVE_CURRENCY = "NGN";

// Asynchronously fetch current financial exchange data from public endpoints
async function fetchLiveExchangeRates() {
    try {
        // Accessing ExchangeRate-API free public network node
        const response = await fetch("https://er-api.com");
        if (!response.ok) throw new Error("Network response failure");

        const data = await response.json();

        // Extract NGN conversion weight based on global USD base charts
        if (data && data.rates && data.rates.NGN) {
            FX_CONVERSION_RATE = data.rates.NGN;
            console.log(`%c[DriveSelect FX Vault] Rates updated live: $1 USD = ₦${FX_CONVERSION_RATE.toFixed(2)} NGN`, "color: #2196f3; font-weight: bold;");
        }
    } catch (error) {
        console.warn("[DriveSelect FX Vault] Live API offline. Deploying safe backup cache structures.", error);
    }
}

// Function to generate the car cards dynamically with WhatsApp chat routers
function renderInventory(carsToRender) {
    const grid = document.getElementById("dynamicCarGrid");
    if (!grid) return;

    grid.innerHTML = "";

    // Insert your active dealership sales team phone number here (include international country code, no "+" or spaces)
    const DEALER_WHATSAPP_NUMBER = "2348000000000"; // Replace with your true Nigerian line (e.g., 234 followed by number)

    carsToRender.forEach(car => {
        let finalDisplayPrice = car.price;
        let currencySymbol = "₦";

        if (CURRENT_ACTIVE_CURRENCY === "USD") {
            finalDisplayPrice = Math.round(car.price / FX_CONVERSION_RATE);
            currencySymbol = "\$";
        }

        const formattedPrice = `${currencySymbol}${finalDisplayPrice.toLocaleString()}`;
        const specsText = `${car.transmission || 'Automatic'} | ${car.mileage || '0 miles'} | ${car.fuel || 'Petrol'}`;

        // Construct the customized WhatsApp template text string
        const baseWhatsappMessage = `Hello DriveSelect Nigeria, I am interested in purchasing the following vehicle asset from your showroom inventory:\n\n` +
            `🚗 *Model:* ${car.name}\n` +
            `💰 *Price:* ${formattedPrice} (${CURRENT_ACTIVE_CURRENCY})\n` +
            `⚙️ *Specs:* ${specsText}\n\n` +
            `Please let me know if this vehicle is available for a test drive at your showroom location.`;

        // Encode strings to be completely browser and mobile compliant
        const encodedMessage = encodeURIComponent(baseWhatsappMessage);
        const whatsappLiveUrl = `https://wa.me{DEALER_WHATSAPP_NUMBER}?text=${encodedMessage}`;

        const cardHTML = `
            <div class="car-card" data-category="${car.category}">
                <img src="${car.img}" alt="${car.name}" class="car-img">
                <div class="car-info">
                    <h3 class="car-name">${car.name}</h3>
                    <div class="car-price" data-base-price="${car.price}">${formattedPrice}</div>
                    <div class="car-specs" style="margin-bottom: 15px;">
                        <span>${car.transmission}</span>
                        <span>${car.mileage}</span>
                        <span>${car.fuel}</span>
                    </div>
                    
                    <div style="display: flex; gap: 10px;">
                        <button class="btn" style="flex: 1; padding: 10px; font-size: 13px;" onclick="openFinanceModal(${finalDisplayPrice})">Finance</button>
                        <!-- SMART WHATSAPP CHAT ROUTER BUTTON -->
                        <a href="${whatsappLiveUrl}" target="_blank" class="btn" style="flex: 2; background-color: #25D366; text-align: center; padding: 10px; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 5px;">
                            <span style="font-size: 16px;">💬</span> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// Initial initialization loops
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Fetch market factors before compiling initial layout cards
    await fetchLiveExchangeRates();

    const currentCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;
    renderInventory(currentCatalog);

    // 2. Global Currency Dropdown Selection Handlers
    const currencyDropdown = document.getElementById("publicCurrencySwitch");
    if (currencyDropdown) {
        currencyDropdown.addEventListener("change", (e) => {
            CURRENT_ACTIVE_CURRENCY = e.target.value;
            const activeCategoryFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");

            let workingCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;
            if (activeCategoryFilter !== "all") {
                workingCatalog = workingCatalog.filter(car => car.category === activeCategoryFilter);
            }
            renderInventory(workingCatalog);
        });
    }

    // 3. Category Filter Action Listeners Stack
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-filter");
            let workingCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;

            if (category === "all") {
                renderInventory(workingCatalog);
            } else {
                const filtered = workingCatalog.filter(car => car.category === category);
                renderInventory(filtered);
            }
        });
    });
});


// Change this line near the bottom of your inventory.js script file:
document.addEventListener("DOMContentLoaded", () => {
    // Read live runtime modifications instead of raw arrays
    const dynamicCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;
    renderInventory(dynamicCatalog);

    // (Keep the remaining filter button event listener logic below it exactly the same)


    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.getAttribute("data-filter");
            if (category === "all") {
                renderInventory(CAR_INVENTORY);
            } else {
                const filtered = CAR_INVENTORY.filter(car => car.category === category);
                renderInventory(filtered);
            }
        });
    });
});


