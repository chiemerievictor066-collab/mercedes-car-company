# 🏎️ DriveSelect Automotive Platform

Welcome to **DriveSelect**, a production-ready, client-side digital automotive marketplace and CRM infrastructure optimized for localized commerce in Nigeria.

This platform offers a high-end luxury vehicle showroom for customers, paired with a secure, hardened administrative dashboard configuration for dealership fleet operations.

## 🚀 Live Showroom Deployment
The production instance is automatically built and hosted globally via GitHub Edge Networks.
* 🌐 **Live Website Link:** `https://github.io`
* 🔒 **Administrative Terminal:** `https://github.ioadmin.html`

---

## ⚡ Core Application Features

### 🤝 Public Showroom Experience
* **Live FX Currency Conversion:** An asynchronous fetch pipeline that connects directly to the global ExchangeRate API, allowing buyers to switch display prices between Nigerian Naira (₦) and US Dollars (\$) using live market rates.
* **Smart WhatsApp Lead Generation:** Instant chat routing buttons on every vehicle listing card that compile vehicle information, pricing metrics, and specs into an encoded pre-populated WhatsApp message targeted to the sales desk.
* **Interactive Financing Simulator:** A client-side car note loan calculator that evaluates monthly payment estimations instantly based on principal margins, down payments, interest, and term distributions.
* **Live Customer Testimonials Module:** An interactive rating center where clients can leave star ratings and reviews that save permanently to the database cache and dispatch instant email alerts.

### 💼 Secure Operations Control Center (`/admin.html`)
* **Cryptographic Access Firewall:** Entry is secured by a session-token gateway lock. The default operational system passkey is `AdminDrive2026` (fully updatable right from the console).
* **Live Showroom Fleet Management:** An inline management panel to visually upload new vehicle assets from device camera rolls via Base64 binary processing strings, or wipe records live.
* **Dealership Metrics & Analytics:** Real-time counters calculating active fleet stock volumes, gross capital valuation matrices, average showroom MSRP, and a monthly sales goal progression slider.
* **Proforma Invoice Generator:** Row actions to compile print-friendly purchase orders with 7.5% Nigerian VAT calculations, FRSC registration variables, and logistics surcharges—complete with local PDF export support.
* **Integrated Paystack Payment Gateway:** Direct payment links that spawn a secure inline frame checkout processing Naira cards, USSD, and bank transfers, routing funds straight to a connected Nigerian commercial bank statement.
* **Automated 24-Hour Database Backups:** Background scheduling loops that automatically pack your absolute state arrays into downloadable `.json` backup files daily to protect against data losses.

---

## 📁 Project Architecture & Components
The platform runs entirely client-side without relying on expensive server hardware. The loose-file directory map consists of:

* `index.html` — The primary user-facing storefront showroom interface.
* `about.html` — Dealership metrics, corporate milestones, and values profile page.
* `car-details.html` — Dynamic showcase landing node utilizing URL parameters.
* `admin.html` — Secure administrative gateway dashboard.
* `styles.css` — Global high-end luxury dark-mode design system stylesheet.
* `inventory.js` — Showroom catalog dataset management, rendering arrays, and live FX API connections.
* `admin.js` — Administrative accounting logic, analytics calculators, firewalls, and CSV exporters.
* `paystack-config.js` — Secure inline payment gateway triggers and checkout handlers.
* `reviews.js` — Star rating calculations and feedback data streaming handlers.
* `scheduler.js` — Client-side test-drive reservation engine.
* `email-config.js` — Mail server configurations connecting form actions to real email inboxes.

---

## 🛠️ Local Development & Maintenance
To test modifications locally on your machine before committing updates to the cloud:

1. Clone or download your loose files into a single project directory.
2. Launch your command terminal inside the project directory and install the development server packages:
   ```bash
   npm install
   ```
3. Boot up the high-efficiency local runtime engine:
   ```bash
   npm start
   ```
4. The system will open your platform locally on `http://localhost:3000` with hot-reloading active.

---
*Developed by the DriveSelect Engineering Network. Production Build — Stable V1.0.0 (2026)*
