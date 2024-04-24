export default function formatIt(input, currency, sub = false) {
    const maxDigits = Number.isInteger(input) ? 0 : 2;
    const {subSymbol, subUnit} = currency;

    if (input > 0 && input < 1 && sub && subSymbol && subUnit) {
        return `${input * subUnit} ${subSymbol}`;
    }
    return input.toLocaleString(
        currency.lang, {
            style: 'currency', 
            currency: currency.iso, 
            maximumFractionDigits: maxDigits
        }
    )
}