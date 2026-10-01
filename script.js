document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const carCards = document.querySelectorAll(".car-card");
    const contactForm = document.getElementById("carContactForm");

    // 1. Dynamic Inventory Filter Logic
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            // Filter car cards based on selection
            carCards.forEach(card => {
                const carCategory = card.getAttribute("data-category");

                if (filterValue === "all" || filterValue === carCategory) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });

    // 2. Interactive Form Submission
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("clientName").value;
            const email = document.getElementById("clientEmail").value;
            const message = document.getElementById("clientMessage").value;

            // Simple user validation confirmation mockup
            alert(`Thank you, ${name}! Your inquiry regarding our inventory has been received. A DriveSelect advisor will email you at ${email} shortly.`);

            contactForm.reset();
        });
    }
});
