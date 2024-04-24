export default function formatIt(input, currency) {
    return input.toLocaleString(
        currency.lang, {
            style: 'currency', 
            currency: currency.iso, 
            maximumFractionDigits: 0
        }
    )
}