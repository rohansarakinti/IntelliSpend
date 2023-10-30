export default function getTotal(items: any[]) {
    let sum = 0
    for (const item of items) {
        sum += item.amount
    }
    return sum
}