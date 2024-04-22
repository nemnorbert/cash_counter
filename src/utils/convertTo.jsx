export default function convertTo(input, currencyData) {
    return input.toLocaleString(
        currencyData.lang, {
            style: 'currency', 
            currency: currencyData.currency, 
            maximumFractionDigits: 0
        }
    )
}