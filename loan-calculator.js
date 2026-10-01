// Loan Calculator Math Logic
function calculateCarLoan() {
    const priceInput = parseFloat(document.getElementById("calcVehiclePrice").value) || 0;
    const downPayment = parseFloat(document.getElementById("calcDownPayment").value) || 0;
    const interestRate = parseFloat(document.getElementById("calcInterest").value) || 0;
    const loanTermMonths = parseInt(document.getElementById("calcTerm").value) || 60;

    const loanAmount = priceInput - downPayment;

    if (loanAmount <= 0) {
        document.getElementById("monthlyPaymentResult").innerText = "\$0.00";
        return;
    }

    // Monthly interest calculation
    const monthlyRate = (interestRate / 100) / 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
        monthlyPayment = loanAmount / loanTermMonths;
    } else {
        monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
            (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    }

    // Display formatted results on UI
    document.getElementById("monthlyPaymentResult").innerText = `$${monthlyPayment.toFixed(2)}`;
}

// Helper utility to make calculations responsive to inputs instantly
function openFinanceModal(vehiclePrice) {
    const section = document.getElementById("finance-calculator-section");
    if (section) {
        document.getElementById("calcVehiclePrice").value = vehiclePrice;
        calculateCarLoan();
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const calcInputs = document.querySelectorAll(".calc-input");
    calcInputs.forEach(input => {
        input.addEventListener("input", calculateCarLoan);
    });
});
