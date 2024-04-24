import formatIt from "../utils/formatIt";

export default function Panel({ currency, setCurrency, total, price, setPrice, reset }) {
    const overall = total.coin + total.banknote;
    const isForint = currency.current.iso !== "huf";

    function handlerChangeSwitch(e) {
        const selectedCurrency = currency.all[e.target.value];

        setCurrency(c => ({
            ...c,
            current: selectedCurrency
        }));

        reset();
    }
    

    function Switcher() {
        return (<>
            <div className="switch">
                <select onChange={handlerChangeSwitch} value={currency.current.iso} name="switcher" id="switcher">
                    {
                        Object.keys(currency.all).map((key, i) => (
                            <option key={i} value={key}>{key.toUpperCase()}</option>
                        ))
                    }
                </select>
                { isForint && 
                    <input onChange={
                        (e) => setPrice(e.target.value)
                    } value={price} placeholder="Price" type="number" name="price" id="price" min="300" max="500"
                />}
            </div>
        </>)
    }

    function Button({ children, isReset = false }) {
        const handleOnclick = isReset ? reset : undefined;
        return (<>
            <button onClick={handleOnclick}>{ children }</button>
        </>)
    }

    const showForint = () => {
        if (!price || !isForint) { return 0}

        const total = Math.ceil( overall * price );

        return total.toLocaleString(
            "hu-HU", {
                style: 'currency', 
                currency: "huf", 
                maximumFractionDigits: 0
            }
        )
    }

    return (<>
        <div id="total">
            <div className="title">
                <Switcher />
            </div>
            <div className="value">
                <div>{formatIt(overall, currency.current)}</div>
                {
                    isForint &&
                        <div>{ showForint() }</div>
                }
            </div>
        </div>
        <div className="buttons">
            <Button>Save</Button>
            <Button>Print</Button>
            <Button reset={reset}>Reset</Button>
        </div>
    </>)
}