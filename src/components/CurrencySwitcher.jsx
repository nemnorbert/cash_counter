export default function CurrencySwitcher({ currency, currencies, price, setPrice, onChangeSwitch }) {
    return (<>
        <div className="switch">
            <select onChange={onChangeSwitch} value={currency.iso} name="switcher" id="switcher">
                {
                    Object.keys(currencies).map((key, i) => (
                        <option key={i} value={key}>{key.toUpperCase()}</option>
                    ))
                }
            </select>
            { currency.iso !== "huf" && 
                <input onChange={ (e) => setPrice(e.target.value) } 
                value={price} placeholder="Price" type="number" inputmode="numeric" pattern="[0-9]*" name="price" id="price" min="300" max="500"
            />}
        </div>
    </>)
}