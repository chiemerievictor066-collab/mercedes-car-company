// Test-Drive Scheduling Subsystem
document.addEventListener("DOMContentLoaded", () => {
    const scheduleForm = document.getElementById("testDriveForm");

    // Automatically enforce that customers cannot choose past calendar dates
    const datePicker = document.getElementById("bookingDate");
    if (datePicker) {
        const today = new Date().toISOString().split('T')[0];
        datePicker.setAttribute('min', today);
    }

    if (scheduleForm) {
        scheduleForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const vehicle = document.getElementById("bookingVehicle").value;
            const date = document.getElementById("bookingDate").value;
            const time = document.getElementById("bookingTime").value;

            // Generate appointment confirmation ID
            const trackingID = "DS-" + Math.floor(100000 + Math.random() * 900000);

            alert(`Reservation Confirmed!\n\nTracking ID: ${trackingID}\nVehicle: ${vehicle}\nDate: ${date}\nArrival Window: ${time}\n\nOur service desk will send SMS setup alerts shortly.`);
            scheduleForm.reset();
        });
    }
});
