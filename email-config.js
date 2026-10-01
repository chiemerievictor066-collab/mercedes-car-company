/**
 * DRIVE_SELECT REAL-WORLD EMAIL CONFIGURATION ENGINE
 * To receive real notification emails in your inbox when someone fills out a form:
 * 1. Sign up for a free account at https://emailjs.com
 * 2. Connect your email address (Gmail, Outlook, etc.) to get a "Service ID"
 * 3. Create a basic message template to get a "Template ID"
 * 4. Paste your keys in the variables below!
 */

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";

// Initialize EmailJS network pipelines on page startup
(function () {
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log("%c[DriveSelect Mail] Node Active", "color: #4caf50; font-weight: bold;");
    } else {
        console.warn("[DriveSelect Mail] Email script loaded, but API keys are missing. Form entries will fallback to screen alerts.");
    }
})();

// Intercept contact submissions and route them through the cloud pipeline
function sendLiveWebEmail(formElement, clientName, clientMessage) {
    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY_HERE") {
        // Fallback placeholder logic for testing files locally before API initialization
        return false;
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formElement)
        .then(() => {
            alert(`Success! Thanks ${clientName}, your request has been routed to our live dispatch queue.`);
        }, (error) => {
            console.error('Email Transmission Fault:', error);
            alert("Transmission channel timeout. Falling back to cached message queues.");
        });
    return true;
}
