/**
 * DRIVE_SELECT REAL NIGERIAN PAYMENT ENGINE
 * 1. Sign up for a free business account at https://paystack.com
 * 2. Go to Settings -> API Keys & Webhooks
 * 3. Copy your "Public Key" (It starts with pk_live_ or pk_test_)
 * 4. Paste your key in the variable below!
 */

const PAYSTACK_PUBLIC_KEY = "YOUR_PAYSTACK_PUBLIC_KEY_HERE";

function initializePaystackPayment(amountInNaira, customerEmail, vehicleName, invoiceID) {
    if (PAYSTACK_PUBLIC_KEY === "YOUR_PAYSTACK_PUBLIC_KEY_HERE") {
        alert("Payment System Demo Mode: Please insert your genuine Paystack Public Key inside 'paystack-config.js' to accept real bank deposits.");
        return;
    }

    // Paystack processes amounts in Kobo (1 Naira = 100 Kobo)
    const amountInKobo = Math.round(amountInNaira * 100);

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: customerEmail || "buyer@driverselect.com",
        amount: amountInKobo,
        currency: "NGN",
        ref: 'DS-' + Math.floor((Math.random() * 1000000000) + 1), // Generate random transaction reference
        metadata: {
            custom_fields: [
                {
                    display_name: "Vehicle Model",
                    variable_name: "vehicle_model",
                    value: vehicleName
                },
                {
                    display_name: "Invoice Number",
                    variable_name: "invoice_number",
                    value: invoiceID
                }
            ]
        },
        // Locate the callback section inside paystack-config.js and update it:
        callback: function (response) {
            // 1. Compile transaction metadata registers
            const newPaymentRecord = {
                reference: response.reference,
                email: customerEmail,
                vehicle: vehicleName,
                amount: amountInNaira,
                date: new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            };

            // 2. Read existing payments log or spawn empty array storage structures
            let paymentHistory = JSON.parse(localStorage.getItem("ds_payment_ledger")) || [];
            paymentHistory.unshift(newPaymentRecord);

            // Commit payload directly to global browser system registers
            localStorage.setItem("ds_payment_ledger", JSON.stringify(paymentHistory));

            alert(`Payment Verified!\nReference: ${response.reference}\n\n₦${amountInNaira.toLocaleString()} has been captured. The master audit ledger has been updated.`);

            // Automatically refresh the current window view or matching manager tabs
            if (window.opener && typeof window.opener.renderPaymentLedgerConsole === "function") {
                window.opener.renderPaymentLedgerConsole();
            } else if (typeof renderPaymentLedgerConsole === "function") {
                renderPaymentLedgerConsole();
            }
        }
    })
}
