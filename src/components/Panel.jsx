import CurrencySwitcher from "./CurrencySwitcher";
import LangSwitcher from "./LangSwitcher";

export default function Panel({ translate, languages, currency, currencies, total, price, setPrice, reset, saveIt, toMoney, onChangeCurrency, onChangeLang }) {
    const overall = total.coin + total.banknote;

    const subTotal = () => {
        if (!price || currency.iso === "huf") { return ""}
        const total = Math.ceil( overall * price );
        return total.toLocaleString("hu-HU", { style: 'currency', currency: "huf", maximumFractionDigits: 0 })
    }

    return (<>
        <div id="total">
            <div className="title">
                <LangSwitcher languages={languages} translate={translate} onChangeLang={onChangeLang} />
                <CurrencySwitcher currency={currency} currencies={currencies} price={price} setPrice={setPrice} onChangeSwitch={onChangeCurrency} />
            </div>
            <div className="value">
                <div>{ toMoney(overall) }</div>
                <div>{ subTotal() }</div>
            </div>
        </div>
        <div className="buttons">
            <button onClick={saveIt}>{ translate.save }</button>
            <button>{ translate.print }</button>
            <button onClick={reset}>{ translate.reset }</button>
        </div>
    </>)
}