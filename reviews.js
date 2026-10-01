// Central Database System Core for Customer Testimonial Arrays
const REVIEWS_FALLBACK_DATABASE = [
    {
        name: "Alhaji Musa Ibrahim",
        score: 5,
        text: "Outstanding sourcing log mechanics! Handled the delivery of my Grand Touring Sedan down to Abuja with full FRSC plate verifications safely. Zero stress.",
        date: "September 14, 2026"
    },
    {
        name: "Dr. Chioma Nwachukwu",
        score: 4,
        text: "The currency conversion module makes it very clear to track capital metrics directly in Naira. Very responsive customer support channels over WhatsApp.",
        date: "September 28, 2026"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("showroomReviewForm");
    const reviewsFeed = document.getElementById("liveReviewsContainer");
    const starSelectionNodes = document.querySelectorAll(".star-node");

    let activeScoreSelection = 5; // Global runtime tracker variable defaults to 5 stars
    let masterReviewCatalog = JSON.parse(localStorage.getItem("ds_client_reviews")) || REVIEWS_FALLBACK_DATABASE;

    // 1. STAR INTERACTIVE HOVER & TAP SELECTION LOGIC
    starSelectionNodes.forEach(star => {
        // Handle click selection events
        star.addEventListener("click", () => {
            activeScoreSelection = parseInt(star.getAttribute("data-score"));
            updateStarSelectorUI(activeScoreSelection);
        });
    });

    function updateStarSelectorUI(score) {
        starSelectionNodes.forEach(star => {
            const starValue = parseInt(star.getAttribute("data-score"));
            if (starValue <= score) {
                star.style.color = "#ff9800"; // Light up matching stars gold
            } else {
                star.style.color = "#ccc"; // Dim balance paths
            }
        });
    }

    // 2. LIVE METRICS & FEED COMPREHENSIVE RENDER ENGINE
    function renderShowroomReviews() {
        if (!reviewsFeed) return;
        reviewsFeed.innerHTML = "";

        let sumOfAllScores = 0;
        const totalRecordCount = masterReviewCatalog.length;

        masterReviewCatalog.forEach(review => {
            sumOfAllScores += review.score;

            // Build visual representation star rows
            const starRepresentation = "⭐".repeat(review.score);

            const reviewCardHTML = `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 3px solid #ff3e3e; box-shadow: 0 2px 5px rgba(0,0,0,0.01);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <strong>${review.name}</strong>
                        <span style="font-size: 12px; color: #999;">${review.date}</span>
                    </div>
                    <div style="font-size: 12px; margin-bottom: 5px;">${starRepresentation}</div>
                    <p style="font-size: 14px; color: #555; font-style: italic; line-height: 1.4;">"${review.text}"</p>
                </div>
            `;
            reviewsFeed.innerHTML += reviewCardHTML;
        });

        // Calculate and project analytical summaries accurately
        const averageAggregateScore = totalRecordCount > 0 ? (sumOfAllScores / totalRecordCount) : 0;

        document.getElementById("summaryAvgRating").innerText = averageAggregateScore.toFixed(1);
        document.getElementById("summaryTotalReviews").innerText = `${totalRecordCount} Submissions`;
        document.getElementById("summaryStarRow").innerText = "⭐".repeat(Math.round(averageAggregateScore));

        // Save data payload registers to persistent caching systems
        localStorage.setItem("ds_client_reviews", JSON.stringify(masterReviewCatalog));
    }

    // Locate the submission block inside reviews.js and replace it with this version:
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("reviewerName").value.trim();
            const text = document.getElementById("reviewerText").value.trim();
            const todayDate = new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' });

            const newReviewObject = {
                name: name,
                score: activeScoreSelection,
                text: text,
                date: todayDate
            };

            // 1. Commit review entry into local showroom browser arrays live
            masterReviewCatalog.unshift(newReviewObject);
            renderShowroomReviews();

            // 2. LIVE CLOUD MAIL TRANSMISSION SUBSYSTEM HOOK
            // Verifies if the automated config setup file (email-config.js) is initialized
            if (typeof emailjs !== 'undefined' && typeof EMAILJS_PUBLIC_KEY !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY_HERE") {

                // Format a clean data payload matching your EmailJS service parameters templates
                const mailPayloadParameters = {
                    notification_type: "NEW CUSTOMER TESTIMONIAL REVIEW",
                    sender_name: name,
                    submission_date: todayDate,
                    assigned_rating: "⭐".repeat(activeScoreSelection) + ` (${activeScoreSelection}/5 Stars)`,
                    message_content: text,
                    dashboard_routing_link: window.location.href
                };

                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, mailPayloadParameters)
                    .then(() => {
                        console.log("%c[DriveSelect Cloud] Review alert transmitted successfully.", "color: #4caf50; font-weight: bold;");
                    }, (error) => {
                        console.error("[DriveSelect Cloud] Mail system pipeline transmission fault:", error);
                    });
            } else {
                console.log("%c[DriveSelect Dev Notice] Review saved locally. (Connect true API keys inside email-config.js to activate real email delivery)", "color: #ff9800;");
            }

            // 3. Reset form elements back to baseline states
            feedbackForm.reset();
            activeScoreSelection = 5;
            updateStarSelectorUI(5);

            alert("Thank you! Your testimonial has been posted live onto our showroom wall.");
        });
    }

    // Boot routines setup triggers
    updateStarSelectorUI(5);
    renderShowroomReviews();
});
