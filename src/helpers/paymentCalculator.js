export const calculatePayment = (values) => {
    const { mortgageAmount, paymentPeriod, interestRate, monthlySavings, savingsPeriod } = values;
    const downPayment = monthlySavings * savingsPeriod;
    const mortgageTotal = mortgageAmount - downPayment;
    const formattedInterestRate = interestRate / 100;
    const calculatedPayment = (mortgageTotal * (formattedInterestRate / 12) * (Math.pow(1 + (formattedInterestRate / 12),  12 * paymentPeriod))) / ((Math.pow(1 + (formattedInterestRate / 12),  12 * paymentPeriod)) - 1);

    return calculatedPayment.toFixed(2);
};
