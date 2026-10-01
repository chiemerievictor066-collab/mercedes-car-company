// ==============================================================================
// ADMINISTRATIVE FIREWALL ACCESS MANAGER (UPDATED WITH SECURE KEY OVERRIDES)
// ==============================================================================
(function checkAdminGatekeeper() {
    // 1. Check local persistent registers or deploy the native asset fallback password
    window.getMasterPassword = function () {
        return localStorage.getItem("ds_admin_passkey_vault") || "AdminDrive2026";
    };

    document.addEventListener("DOMContentLoaded", () => {
        const lockoutOverlay = document.getElementById("adminSecurityLockout");
        const loginForm = document.getElementById("adminLoginForm");
        const passkeyField = document.getElementById("adminPasskey");
        const errorMsg = document.getElementById("loginError");
        const logOutBtn = document.getElementById("adminLogOutBtn");
        const passChangeForm = document.getElementById("adminPasswordChangeForm");

        const sessionToken = sessionStorage.getItem("ds_admin_authenticated");

        if (sessionToken === "granted") {
            lockoutOverlay.style.display = "none";
        }

        // 2. Gateway Verification Form Interception
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const currentValidKey = window.getMasterPassword();

            if (passkeyField.value === currentValidKey) {
                sessionStorage.setItem("ds_admin_authenticated", "granted");
                lockoutOverlay.style.opacity = "0";
                setTimeout(() => lockoutOverlay.style.display = "none", 300);
                errorMsg.style.display = "none";
            } else {
                errorMsg.style.display = "block";
                passkeyField.value = "";
                passkeyField.focus();
            }
        });

        // 3. Dynamic Password Reset Submission Engine
        if (passChangeForm) {
            passChangeForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const oldInput = document.getElementById("oldPasskey").value;
                const newInput = document.getElementById("newPasskey").value.trim();
                const activePasskey = window.getMasterPassword();

                // Validate current credentials before executing mutations
                if (oldInput !== activePasskey) {
                    alert("Security Violation: The current password you entered is incorrect. Passkey modification rejected.");
                    passChangeForm.reset();
                    return;
                }

                if (newInput.length < 6) {
                    alert("Security Hardening Rule: The new password must be at least 6 characters long for structural safety.");
                    return;
                }

                // Write the new key override into storage memory banks
                localStorage.setItem("ds_admin_passkey_vault", newInput);
                passChangeForm.reset();

                console.log("%c[DriveSelect Cryptography] System security credentials modified successfully.", "color: #2196f3; font-weight: bold;");
                alert("Security Credentials Updated! Your old password has been revoked. Please use your new passkey on your next login shift.");
            });
        }

        // 4. Active Log Out Subroutine Trigger
        if (logOutBtn) {
            logOutBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to lock the dashboard management node?")) {
                    sessionStorage.removeItem("ds_admin_authenticated");
                    lockoutOverlay.style.opacity = "1";
                    lockoutOverlay.style.display = "flex";
                    alert("Session terminated successfully. Terminal locked.");
                }
            });
        }
    });
})();

// Locate your main script setup inside admin.js and add the search listener layer:
document.addEventListener("DOMContentLoaded", () => {
    const adminTableBody = document.getElementById("adminInventoryTable");
    const addNewVehicleForm = document.getElementById("newVehicleForm");
    const searchInputField = document.getElementById("adminSearchQuery"); // New UI Node hook

    let activeCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;

    // Modified core render routine to accept dynamic array filtration pipelines
    // Locate function renderAdminConsole() inside admin.js and update its implementation:
    function renderAdminConsole(catalogSubset = activeCatalog) {
        if (!adminTableBody) return;
        adminTableBody.innerHTML = "";

        // 1. Math counters track master array ledger totals
        const totalVehiclesCount = activeCatalog.length;
        const totalFleetGrossValue = activeCatalog.reduce((runningSum, car) => runningSum + Number(car.price), 0);
        const averageVehicleMSRP = totalVehiclesCount > 0 ? (totalFleetGrossValue / totalVehiclesCount) : 0;

        document.getElementById("statTotalCars").innerText = `${totalVehiclesCount} Vehicles`;
        document.getElementById("statTotalValue").innerText = `₦${totalFleetGrossValue.toLocaleString()}`;
        document.getElementById("statAvgValue").innerText = `₦${Math.round(averageVehicleMSRP).toLocaleString()}`;

        // 2. NEW: HARDENED QUANTITATIVE LOW-STOCK CHECK IMPLEMENTATION
        const warningBannerSlot = document.getElementById("adminStockWarningBannerSlot");
        if (warningBannerSlot) {
            if (totalVehiclesCount < 3) {
                // Drop a high-visibility red flashing warning banner into the interface slot
                warningBannerSlot.innerHTML = `
                <div style="background: #ffebee; border: 2px solid #ef5350; color: #c62828; padding: 15px 20px; border-radius: 6px; margin-bottom: 25px; font-weight: bold; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 12px rgba(239, 83, 80, 0.15); animation: pulseAlertGlow 2s infinite ease-in-out;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 22px;">⚠️</span>
                        <div>
                            <div style="font-size: 15px; letter-spacing: 0.3px;">CRITICAL INVENTORY ALERT: LOW FLEET STOCK DETECTED</div>
                            <div style="font-size: 12px; color: #e53935; font-weight: normal; margin-top: 2px;">Your active showroom counts have dropped to (${totalVehiclesCount} units). Sourcing parameters recommend holding a minimum of 3 models to sustain customer engagement channels.</div>
                        </div>
                    </div>
                    <a href="#newVehicleForm" style="background: #c62828; color: white; text-decoration: none; padding: 6px 15px; border-radius: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Restock Showroom</a>
                </div>
            `;
            } else {
                warningBannerSlot.innerHTML = ""; // Clear banner if showroom meets safe stock margins
            }
        }

        // 3. Render Database Table Grid Content (Original loop routines continuation)
        if (catalogSubset.length === 0) {
            adminTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #888; padding: 30px;">No vehicles match your active search terms.</td></tr>`;
            return;
        }

        // ... remaining row printing logic blocks loop exactly the same ...


        // NIGERIAN COMPLIANT FINANCIAL INVOICE ENGINE ROUTINE
        window.generateInvoiceReceipt = function (targetIndex) {
            let activeCatalog = JSON.parse(localStorage.getItem("ds_custom_catalog")) || CAR_INVENTORY;
            const vehicle = activeCatalog[targetIndex];
            if (!vehicle) return;

            // Compile dynamic localized accounting metadata metrics registers
            const invoiceID = "DS-NG-" + Math.floor(100000 + Math.random() * 900000);
            const currentDate = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });

            // Nigerian Localized Tax Structures Calculations
            const NIGERIAN_VAT_RATE = 0.075; // 7.5% statutory VAT rate 
            const estimatedVAT = vehicle.price * NIGERIAN_VAT_RATE;

            // Local Dealership Surcharges (FRSC Plates & Registration Estimates)
            const frscRegistrationFee = 150000.00;
            const dealerDeliveryHandling = 85000.00;
            const netTotalPurchaseAmount = vehicle.price + estimatedVAT + frscRegistrationFee + dealerDeliveryHandling;

            // Spawn an isolated print window instance container layout configuration
            const printWindow = window.open("", "_blank", "width=800,height=900");
            // Locate window.generateInvoiceReceipt inside admin.js and modify the generated HTML template:

            printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Purchase Order Invoice - ${invoiceID}</title>
            <!-- LOAD OFFICIAL PAYSTACK POPUP ENGINE -->
            <script src="https://paystack.co"></script>
            <script src="paystack-config.js"></script>
            <style>
                /* ... keep your existing css styles here ... */
                .pay-now-btn { background: #4caf50; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer; font-size:14px; margin-left:10px; }
                .pay-now-btn:hover { background: #43a047; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: space-between; background:#f4f4f4; padding:15px; border-radius:6px;">
                <p style="color: #333; font-size: 14px; margin:0; display:flex; align-items:center;">📄 Invoice ready. You can print to paper or collect an immediate card/bank transfer payment live.</p>
                <div>
                    <button onclick="window.print()" style="background: #1a1a1a; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer;">Print / Save PDF</button>
                    
                   // Locate the pay-now-btn button line inside the printWindow.document.write layout loop of admin.js:
// REPLACE the old button markup with this updated logic execution module:

<!-- NEW DEPLOYED DYNAMIC CAPTURE TERMINAL BUTTON -->
<button onclick="
    let customerEmailInput = prompt('Please enter the customer\'s email address for billing and receipt delivery:', 'client@example.com');
    
    // Validate entry inputs and filter out cancellations
    if (customerEmailInput && customerEmailInput.includes('@')) {
        window.opener.initializePaystackPayment(${netTotalPurchaseAmount}, customerEmailInput, '${vehicle.name}', '${invoiceID}');
    } else if (customerEmailInput !== null) {
        alert('Invalid entry. A functional billing email address is mandatory to securely route financial receipts.');
    }
" class="pay-now-btn">💳 Secure Pay Now (Naira)</button>

            
            <!-- ... rest of your pristine invoice layout structure goes here ... -->
    `);


            printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Purchase Order Invoice - ${invoiceID}</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; padding: 40px; line-height: 1.5; }
                .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
                .brand-title { font-size: 28px; font-weight: bold; letter-spacing: 1px; }
                .brand-title span { color: #ff3e3e; }
                .billing-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .billing-table th { background: #1a1a1a; color: white; padding: 12px; text-align: left; }
                .billing-table td { padding: 15px; border-bottom: 1px solid #ddd; }
                .financial-block { margin-top: 30px; text-align: right; line-height: 2; font-size: 16px; }
                .total-row { font-size: 22px; font-weight: bold; color: #ff3e3e; border-top: 2px double #1a1a1a; padding-top: 5px; }
                .disclaimer { font-size: 11px; color: #777; margin-top: 60px; text-align: center; border-top: 1px solid #eee; padding-top: 15px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: space-between;">
                <p style="color: #666; font-size: 14px;">📄 Document layout previewing. Click button to output to system printer hardware queue or save as local PDF file formatting paths.</p>
                <button onclick="window.print()" style="background: #ff3e3e; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer;">Execute Print / Export</button>
            </div>

            <div class="invoice-header">
                <div>
                    <div class="brand-title">DRIVE<span>SELECT</span></div>
                    <p style="font-size: 13px; color: #555;">DriveSelect Premium Sourcing Nigeria<br>Automotive District, Port Harcourt<br>sales.ng@driverselect.com</p>
                </div>
                <div style="text-align: right;">
                    <h1 style="margin: 0; font-size: 24px; color: #555;">PROFORMA INVOICE</h1>
                    <p style="margin-top: 5px; font-size: 14px;"><strong>Invoice Reference:</strong> #${invoiceID}<br><strong>Processing Date:</strong> ${currentDate}</p>
                </div>
            </div>

            <h3>Automotive Asset Investment Matrix</h3>
            <table class="billing-table">
                <thead>
                    <tr>
                        <th>Showroom Stock Description</th>
                        <th>Classification Architecture</th>
                        <th style="text-align: right;">Base MSRP Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>${vehicle.name}</strong><br><span style="font-size: 12px; color: #666;">Specs: ${vehicle.transmission || "Automatic"} • ${vehicle.mileage || "0 miles"} • ${vehicle.fuel || "Petrol"}</span></td>
                        <td style="text-transform: uppercase; font-size: 13px;">${vehicle.category}</td>
                        <td style="text-align: right; font-weight: 500;">₦${vehicle.price.toLocaleString()}.00</td>
                    </tr>
                </tbody>
            </table>

            <div class="financial-block">
                <table style="margin-left: auto; width: 400px;">
                    <tr><td>Showroom Fleet Base MSRP:</td><td style="text-align: right;">₦${vehicle.price.toLocaleString()}.00</td></tr>
                    <tr><td>FRSC Plate & Vehicle Registration:</td><td style="text-align: right;">₦${frscRegistrationFee.toLocaleString()}.00</td></tr>
                    <tr><td>Logistics & Handling Surcharge:</td><td style="text-align: right;">₦${dealerDeliveryHandling.toLocaleString()}.00</td></tr>
                    <tr><td>Value Added Tax (VAT @ 7.5%):</td><td style="text-align: right;">₦${estimatedVAT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>
                    <tr class="total-row"><td>Gross Out-the-Door Total:</td><td style="text-align: right;">₦${netTotalPurchaseAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>
                </table>
            </div>

            <div class="disclaimer">
                <p>This proforma invoice serves as an active pricing profile representation matching current vehicle inventory states in Nigeria. Final transaction amounts are subject to statutory revisions, port duties where applicable, and final validation by our regional clearing bank partners.</p>
            </div>
        </body >
        </html >
            `);
            printWindow.document.close();
        };

        // Ensure your internal ledger rendering display strings reflect the Naira symbol too:
        // (Locate your row template strings within admin.js renderAdminConsole and alter the price element to: ₦\${car.price.toLocaleString()})
    }
})
// Append this function to the absolute bottom of your admin.js script structure:
window.renderPaymentLedgerConsole = function () {
    const logsTableBody = document.getElementById("adminPaymentLogsTable");
    if (!logsTableBody) return;

    // Pull verified entries directly from browser cache memory layers
    const paymentRecords = JSON.parse(localStorage.getItem("ds_payment_ledger")) || [];
    caution.
        if(paymentRecords.length === 0)()
    logsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #888; padding: 30px;">No settlement records found. Awaiting active customer payments.</td></tr>`;
    return;
}

logsTableBody.innerHTML = ""; // Wipe original placeholder elements

paymentRecords.forEach(log => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size:13px; color:#333;">${log.reference}</code><br><span style="font-size:11px; color:#999;">${log.date}</span></td>
            <td><strong>${log.email}</strong></td>
            <td>${log.vehicle}</td>
            <td style="color:#4caf50; font-weight:bold;">₦${log.amount.toLocaleString()}.00</td>
            <td><span style="background: #e8f5e9; color: #2e7d32; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; border: 1px solid #c8e6c9;">● Completed</span></td>
        `;
    logsTableBody.appendChild(row);
});
;
// Locate window.renderPaymentLedgerConsole inside admin.js and update its implementation:
window.renderPaymentLedgerConsole = function () {
    const logsTableBody = document.getElementById("adminPaymentLogsTable");
    if (!logsTableBody) return;

    // Pull verified entries from local browser cache memory layers
    const paymentRecords = JSON.parse(localStorage.getItem("ds_payment_ledger")) || [];

    // 1. REVENUE GOAL AGGREGATOR ENGINE CALCULATION
    const MONTHLY_REVENUE_TARGET = 50000000; // ₦50,000,000 Naira Milestone

    // Total every successful payment transaction processed live via Paystack
    const grossSettledRevenueSum = paymentRecords.reduce((runningSum, log) => runningSum + Number(log.amount), 0);

    // Compute percentages values capping at max 100% boundary limits
    const rawProgressPercentage = (grossSettledRevenueSum / MONTHLY_REVENUE_TARGET) * 100;
    const boundedProgressPercentage = Math.min(rawProgressPercentage, 100);

    // 2. INJECT TARGET METRICS ONTO THE CONSOLE INTERFACE VISUAL SLIDERS
    const progressBar = document.getElementById("goalProgressIndicatorBar");
    const percentText = document.getElementById("goalPercentValueText");
    const labelText = document.getElementById("goalRevenueRemainingLabelText");

    if (progressBar && percentText && labelText) {
        progressBar.style.width = `${boundedProgressPercentage}%`;
        percentText.innerText = `${rawProgressPercentage.toFixed(1)}%`;

        if (grossSettledRevenueSum >= MONTHLY_REVENUE_TARGET) {
            labelText.innerHTML = `🎉 <span style="color:#2e7d32;">Milestone Achieved! Total Settled: ₦${grossSettledRevenueSum.toLocaleString()}</span>`;
            progressBar.style.background = "linear-gradient(90deg, #4caf50, #8bc34a)"; // Switch slider indicator color to green
        } else {
            const distanceToTarget = MONTHLY_REVENUE_TARGET - grossSettledRevenueSum;
            labelText.innerHTML = `Current Gross Revenue: <strong>₦${grossSettledRevenueSum.toLocaleString()}</strong> | ₦${distanceToTarget.toLocaleString()} remaining to hit target.`;
        }
    }

    // 3. Render Database Table Grid Content (Original table formatting loop logic)
    if (paymentRecords.length === 0) {
        logsTableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #888; padding: 30px;">No settlement records found. Awaiting active customer payments.</td></tr>`;
        return;
    }

    logsTableBody.innerHTML = "";
    paymentRecords.forEach(log => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><code style="background: #f4f4f4; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size:13px; color:#333;">${log.reference}</code><br><span style="font-size:11px; color:#999;">${log.date}</span></td>
            <td><strong>${log.email}</strong></td>
            <td>${log.vehicle}</td>
            <td style="color:#4caf50; font-weight:bold;">₦${log.amount.toLocaleString()}.00</td>
            <td><span style="background: #e8f5e9; color: #2e7d32; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 12px; text-transform: uppercase; border: 1px solid #c8e6c9;">● Completed</span></td>
        `;
        logsTableBody.appendChild(row);
    });
};


// Hook initialization trigger inside the initial document setup routine
document.addEventListener("DOMContentLoaded", () => {
    // Locate the very last line inside your existing DOMContentLoaded block and append:
    if (typeof window.renderPaymentLedgerConsole === "function") {
        window.renderPaymentLedgerConsole();
    }
});

// Append this global reset function macro to the absolute bottom of admin.js:
window.executeGlobalSystemFactoryReset = function () {
    // Layer 1: Initial high-severity user warning check
    const stepOneConfirmation = confirm(
        "WARNING: You are about to initiate a Hard Factory Reset.\n\n" +
        "This utility will permanently erase all custom vehicle listings, wipe your successful Paystack transaction histories, clear out customer reviews, and restore system security parameters. This action cannot be undone.\n\n" +
        "Do you want to proceed?"
    );

    if (!stepOneConfirmation) return;

    // Layer 2: Hard protection verification step against accidental clicks
    const stepTwoConfirmation = prompt(
        "CRITICAL SYSTEM RESET VERIFICATION\n\n" +
        "To finalize data destruction parameters and authorize the command, type exactly 'RESET' into the space bar input field below:"
    );

    if (stepTwoConfirmation === "RESET") {
        console.log("%c[DriveSelect Maintenance] Clearing down platform data memory tables...", "color: #ff3e3e; font-weight: bold;");

        // Clear out customized database key strings from the browser's hardware memory cache maps
        localStorage.removeItem("ds_custom_catalog");    // Drops uploaded cars records ledger
        localStorage.removeItem("ds_payment_ledger");    // Drops accounting settlement transaction history sheets
        localStorage.removeItem("ds_client_reviews");    // Drops custom star rating testimonial feed blocks
        localStorage.removeItem("ds_admin_passkey_vault"); // Revokes customized administrative access passwords

        // Terminate security clearance authorizations to force total core system lock down
        sessionStorage.removeItem("ds_admin_authenticated");

        alert("Database Purge Successful! Core systems cleared down. The platform will now perform an automated clean hot-reboot layout sequence.");

        // Asynchronously force-reload the system framework to initialize clean native asset structures
        window.location.reload();
    } else {
        if (stepTwoConfirmation !== null) {
            alert("Verification mismatch. System signature rejected. Factory database wipe sequence abandoned.");
        }
    }
};
// Append this comprehensive backup automated macro to the absolute bottom of admin.js:
(function initializeAutomatedBackupSubsystem() {
    window.generateSystemBackupPayload = function () {
        // Gather and package all storage registers into a structured master data layout object
        return {
            backup_meta: {
                brand: "DriveSelect Automotive",
                environment: "Production-NG",
                compiled_timestamp: new Date().toISOString(),
                device_agent: navigator.userAgent
            },
            databases: {
                showroom_catalog: JSON.parse(localStorage.getItem("ds_custom_catalog")) || null,
                accounting_ledger: JSON.parse(localStorage.getItem("ds_payment_ledger")) || null,
                client_testimonials: JSON.parse(localStorage.getItem("ds_client_reviews")) || null,
                security_vault: localStorage.getItem("ds_admin_passkey_vault") || null
            }
        };
    };

    window.downloadBackupDataFile = function (payloadData, prefix = "Auto") {
        const timestamp = new Date().toISOString().split('T')[0];
        const fileName = `DriveSelect_${prefix}_Backup_${timestamp}.json`;

        const dataBlob = new Blob([JSON.stringify(payloadData, null, 2)], { type: "application/json" });
        const virtualNode = document.createElement("a");

        virtualNode.href = URL.createObjectURL(dataBlob);
        virtualNode.setAttribute("download", fileName);
        virtualNode.style.display = "none";

        document.body.appendChild(virtualNode);
        virtualNode.click();
        document.body.removeChild(virtualNode);

        console.log(`%c[DriveSelect Backup] Hard copy file exported: ${fileName}`, "color: #2e7d32; font-weight: bold;");
    };
    // Append this projection math calculator script to the absolute bottom of admin.js:
    window.updateFinancialProjections = function () {
        const volumeInput = document.getElementById("simVolumeRange");
        const priceInput = document.getElementById("simPriceRange");

        if (!volumeInput || !priceInput) return;

        // 1. Gather raw data parameters from slider inputs
        const projectedUnits = parseInt(volumeInput.value);
        const averageMSRP = parseInt(priceInput.value);

        // Update UI numerical value tracking tags
        document.getElementById("simVolumeValueText").innerText = projectedUnits;
        document.getElementById("simPriceValueText").innerText = `₦${(averageMSRP / 1000000).toFixed(0)}M`;

        // 2. Perform forecasting computations
        const estimatedGrossMonthlyRevenue = projectedUnits * averageMSRP;
        const NET_DEALER_PROFIT_MARGIN_COEFFICIENT = 0.12; // Standard 12% operational dealership net margins
        const estimatedNetProfit = estimatedGrossMonthlyRevenue * NET_DEALER_PROFIT_MARGIN_COEFFICIENT;

        // 3. Inject dynamic values back onto display summary fields
        document.getElementById("projMonthlyRev").innerText = `₦${estimatedGrossMonthlyRevenue.toLocaleString()}`;
        document.getElementById("projNetProfit").innerText = `₦${Math.round(estimatedNetProfit).toLocaleString()}`;
    };

    // Initialize the projection values as soon as the DOM finishes building
    document.addEventListener("DOMContentLoaded", () => {
        if (typeof window.updateFinancialProjections === "function") {
            window.updateFinancialProjections();
        }
    });


    // 1. DYNAMIC AUTO-RUN CRON CALCULATOR ENGINE
    function runDailyAutomatedBackupCheck() {
        const statusLabel = document.getElementById("backupSyncStatusText");
        const currentTimeMillis = Date.now();
        const lastBackupTimeMillis = parseInt(localStorage.getItem("ds_last_backup_timestamp")) || 0;

        const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;
        const nextScheduleTimeMillis = lastBackupTimeMillis + twentyFourHoursInMillis;

        if (currentTimeMillis >= nextScheduleTimeMillis) {
            console.log("%c[DriveSelect Backup] 24-Hour window expired. Compiling auto daily backup...", "color: #4caf50; font-weight: bold;");

            const backupPayload = window.generateSystemBackupPayload();

            // Execute down-stream device automated download file transfer
            window.downloadBackupDataFile(backupPayload, "Daily_Auto");

            // Log timestamp checkpoint markers into local storage
            localStorage.setItem("ds_last_backup_timestamp", currentTimeMillis.toString());
            if (statusLabel) statusLabel.innerText = `System Status: Daily backup complete. Next auto-check scheduled for tomorrow.`;
        } else {
            if (statusLabel) {
                const remainingTimeHours = Math.ceil((nextScheduleTimeMillis - currentTimeMillis) / (1000 * 60 * 60));
                statusLabel.innerText = `System Status: Verified protected. Next automated snapshot runs in approximately ${remainingTimeHours} hours.`;
            }
        }
    }

    // 2. MANUAL TRIGGERS ACTIONS
    window.triggerManualBackupDownload = function () {
        const manualPayload = window.generateSystemBackupPayload();
        window.downloadBackupDataFile(manualPayload, "Manual");
        alert("Showroom database files packed successfully! Check your device download directory.");
    };

    // 3. DATABASE RESTORATION PARSER ENGINE
    window.importShowroomDatabaseBackup = function (event) {
        const fileTarget = event.target.files[0];
        if (!fileTarget) return;

        if (!confirm("CRITICAL INTERVENTIONS WARNING:\n\nImporting this configuration file will overwrite all your active showroom records and restore settings from this backup. Do you want to proceed?")) {
            event.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const parsedData = JSON.parse(e.target.result);

                // Confirm valid object properties are inside the backup
                if (parsedData && parsedData.databases) {
                    const db = parsedData.databases;

                    if (db.showroom_catalog) localStorage.setItem("ds_custom_catalog", JSON.stringify(db.showroom_catalog));
                    if (db.accounting_ledger) localStorage.setItem("ds_payment_ledger", JSON.stringify(db.accounting_ledger));
                    if (db.client_testimonials) localStorage.setItem("ds_client_reviews", JSON.stringify(db.client_testimonials));
                    if (db.security_vault) localStorage.setItem("ds_admin_passkey_vault", db.security_vault);

                    alert("Database Recovery Successful! Showroom state restored. The system will perform an automated interface reboot loop.");
                    window.location.reload();
                } else {
                    throw new Error("Invalid structure formatting layout data markers.");
                }
            } catch (err) {
                alert("File Error: The backup document you uploaded is corrupted or formatted incorrectly.");
                console.error(err);
            }
        };
        reader.readAsText(fileTarget);
    };

    // Initialize checking routines on page load cycle boot
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(runDailyAutomatedBackupCheck, 1500); // 1.5 Second short loader pause for smoother experience
    });
})();
