"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculator(data, duration) {
    let results = [];
    let currentPortfolio = data.startingInvestment;
    for (let i = 0; i < duration; i++) {
        const investmentName = data.investmentName;
        const yearOfInvestment = i + 1;
        const startOfYearPortfolio = currentPortfolio + data.extraPerYear;
        const profitPercentage = Math.floor((Math.random() *
            (data.highExpectedReturnRate - data.lowExpectedReturnRate + 1) +
            data.lowExpectedReturnRate +
            data.averageReturnRate) /
            2);
        const profit = Number((Math.floor(((startOfYearPortfolio * profitPercentage) / 100) * 100) / 100).toFixed(2)); // This ends up being a float without Number(.toFixed()) ._.
        const endOfYearPortfolio = Number((startOfYearPortfolio + profit).toFixed(2)); //! For some reason, unless I Number(.toFixed()) this too, it'll be a float >:(
        currentPortfolio = endOfYearPortfolio;
        results.push({
            investmentName: investmentName,
            yearOfInvestment: yearOfInvestment,
            startOfYearPortfolio: startOfYearPortfolio,
            endOfYearPortfolio: endOfYearPortfolio,
            profit: profit,
            profitPercentage: profitPercentage,
        });
    }
    return results;
}
function printResults(results) {
    let totalProfit = 0; //! Here too LMAO
    console.log("-----------------------------------------------------------");
    console.log(`Investment Calculations for ${results[1]?.investmentName}`);
    for (let i in results) {
        const result = results[i];
        totalProfit += result?.profit ?? 0;
        console.log("-----------------------------------------------------------");
        console.log("");
        console.log(`Year: ${result?.yearOfInvestment}`);
        console.log(`Starting Value: ${result?.startOfYearPortfolio}`);
        console.log(`End of Year Value: ${result?.endOfYearPortfolio}`);
        console.log(`Profit: € ${result?.profit}`);
        console.log(`Profit Percentage: ${result?.profitPercentage}%`);
        console.log("");
    }
    console.log("-----------------------------------------------------------");
    console.log(`Total Profit: € ${Number(totalProfit.toFixed(2))}`);
    console.log("-----------------------------------------------------------");
    console.log("");
    console.log("End of line.");
}
const investment = {
    investmentName: "S&P500 // HZ4F",
    startingInvestment: 432.71, // In euros (€)
    extraPerYear: 0,
    highExpectedReturnRate: 12, // Note that these are percentages
    lowExpectedReturnRate: -1.44,
    averageReturnRate: 9.96,
};
printResults(calculator(investment, 10));
//# sourceMappingURL=investCalc.js.map