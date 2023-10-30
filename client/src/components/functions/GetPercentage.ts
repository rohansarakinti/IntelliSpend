export default function GetPercentage(transactions: any) {
    let total = 0
    let percentage = {
        "bank_fees": 0,
        "entertainment": 0,
        "food_and_drink": 0,
        "general_merchandise": 0,
        "general_services": 0,
        "government_and_non_profit": 0,
        "home_improvement": 0,
        "transfer_out": 0,
        "loan_payments": 0,
        "medical": 0,
        "personal_care": 0,
        "travel": 0,
        "transportation": 0,
        "rent_and_utilities": 0,
    }
    for (const transaction of transactions) {
        if (transaction.amount > 0) {
            total += transaction.amount
            switch (transaction.personal_finance_category.primary) {
                case "BANK_FEES":
                    percentage.bank_fees += transaction.amount
                    break
                case "ENTERTAINMENT":
                    percentage.entertainment += transaction.amount
                    break
                case "FOOD_AND_DRINK":
                    percentage.food_and_drink += transaction.amount
                    break
                case "GENERAL_MERCHANDISE":
                    percentage.general_merchandise += transaction.amount
                    break
                case "GENERAL_SERVICES":
                    percentage.general_services += transaction.amount
                    break
                case "GOVERNMENT_AND_NON_PROFIT":
                    percentage.government_and_non_profit += transaction.amount
                    break
                case "HOME_IMPROVEMENT":
                    percentage.home_improvement += transaction.amount
                    break             
                case "TRANSFER_OUT":
                    percentage.transfer_out += transaction.amount
                    break
                case "LOAN_PAYMENTS":
                    percentage.loan_payments += transaction.amount
                    break
                case "MEDICAL":
                    percentage.medical += transaction.amount
                    break
                case "PERSONAL_CARE":
                    percentage.personal_care += transaction.amount
                    break
                case "TRAVEL":
                    percentage.travel += transaction.amount
                    break
                case "TRANSPORTATION":
                    percentage.transportation += transaction.amount
                    break
                case "RENT_AND_UTILITIES":
                    percentage.rent_and_utilities += transaction.amount
                    break
            }
        }
    }
    for (const key in percentage) {
        if (percentage.hasOwnProperty(key)) {
            percentage[key as keyof typeof percentage] = parseFloat(((percentage[key as keyof typeof percentage] / total) * 100).toFixed(2))
        }
    }
    return percentage
}