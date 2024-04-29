export default function Item({ counter, item, type, setCountItems, toMoney }) {

    const {count} = counter;
    const total = item * count;

    const handleAmountChange = (newAmount) => {
        const prevQuantity = count;
        const newQuantity = newAmount > 999 ? 999 : Math.max(0, newAmount);
        if (prevQuantity === newQuantity) { return; }
        const newSum = newQuantity * item;
        setCountItems(type, item, newQuantity, newSum)
    };

    const handleChange = (e) => handleAmountChange(Number(e.target.value));
    const handleIncrement = () => handleAmountChange(count + 1);
    const handleDecrement = () => handleAmountChange(count - 1);

    return (
        <div className={ count !== 0 ? "item active" : "item" }>
            <div className="values">
                <div>
                    { toMoney(item) }
                </div>
                <div className="sums">
                    { toMoney(total) }
                </div>
            </div>
            <div className="btn">
                <button onClick={handleIncrement} 
                    disabled={count === 999} 
                    className={count === 999 ? "disabled" : undefined}
                > + 
                </button>

                <input onChange={handleChange} 
                    type="number" 
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="0"
                    name="address"  
                    min="0" 
                    max="999" 
                    value={count > 0 ? count : null}
                />

                <button onClick={handleDecrement} 
                    disabled={count === 0} 
                    className={count === 0 ? "disabled" : undefined}
                > - 
                </button>
            </div>
        </div>
    );
}