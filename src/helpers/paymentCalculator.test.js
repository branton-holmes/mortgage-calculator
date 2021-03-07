import { calculatePayment } from  "./paymentCalculator";

it('Correctly calculates mortgage with values tested via google\'s mortgage calculator ', () => {
    const values = {
        mortgageAmount: 200000,
        paymentPeriod: 30,
        interestRate: 4,
        monthlySavings: 0,
        savingsPeriod: 0,
    }
    expect(calculatePayment(values)).toBe("954.83")
})