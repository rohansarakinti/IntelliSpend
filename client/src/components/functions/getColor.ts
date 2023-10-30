export default function getColor(category: string) {
    switch (category) {
        case "BANK_FEES":
            return "#4FC3F7"
        case "ENTERTAINMENT":
            return "#FF5252"
        case "FOOD_AND_DRINK":
            return "#66BB6A"
        case "GENERAL_MERCHANDISE":
            return "#FFA726"
        case "GENERAL_SERVICES":
            return "#9C27B0"
        case "GOVERNMENT_AND_NON_PROFIT":
            return "#757575"
        case "HOME_IMPROVEMENT":
            return "#8D6E63"            
        case "TRANSFER_OUT":
            return "#26A69A"
        case "LOAN_PAYMENTS":
            return "#EC407A"
        case "MEDICAL":
            return "#9E9D24"
        case "PERSONAL_CARE":
            return "#FFD600"
        case "TRAVEL":
            return "#26C6DA"
        case "TRANSPORTATION":
            return "#1976D2"
        case "RENT_AND_UTILITIES":
            return "#9C27B0"
        default:
            return "#FFFFFF"
    }
}