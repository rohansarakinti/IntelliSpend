export default function Normalize(category: string) {
    switch (category) {
        case "BANK_FEES":
            return "Bank Fees"
        case "ENTERTAINMENT":
            return "Entertainment"
        case "FOOD_AND_DRINK":
            return "Food and Drink"
        case "GENERAL_MERCHANDISE":
            return "General Merchandise"
        case "GENERAL_SERVICES":
            return "General Services"
        case "GOVERNMENT_AND_NON_PROFIT":
            return "Government and Non-Profit"
        case "HOME_IMPROVEMENT":
            return "Home Improvement"
        case "INCOME":
            return "Income"
        case "TRANSFER_IN":
            return "Transfer In"
        case "TRANSFER_OUT":
            return "Transfer Out"
        case "LOAN_PAYMENTS":
            return "Loan Payments"
        case "MEDICAL":
            return "Medical"
        case "PERSONAL_CARE":
            return "Personal Care"
        case "TRAVEL":
            return "Travel"
        case "TRANSPORTATION":
            return "Transportation"
        case "RENT_AND_UTILITIES":
            return "Rent and Utilities"
        default:
            return "Other"
    }
}