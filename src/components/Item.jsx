import { useState, useEffect } from "preact/hooks";
import formatIt from "../utils/formatIt";

export default function Item({ itemValue, updateTotal, currency }) {
    const [count, setCount] = useState(0);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        setCount(0);
        setSum(0);
    }, [currency]);

    const handleAmountChange = (newAmount) => {
        const newQuantity = newAmount > 999 ? 999 : Math.max(0, newAmount);
        const newSum = newQuantity * itemValue;
        const prevQuantity = count;

        setCount(newQuantity);
        setSum(newSum);
        
        if (newQuantity < prevQuantity) {
            const decreasedAmount = (prevQuantity - newQuantity) * itemValue;
            updateTotal(-decreasedAmount);
        } else if (newQuantity > prevQuantity) {
            const increasedAmount = (newQuantity - prevQuantity) * itemValue;
            updateTotal(increasedAmount);
        }
    };

    const handleChange = (e) => handleAmountChange(Number(e.target.value));
    const handleIncrement = () => handleAmountChange(count + 1);
    const handleDecrement = () => handleAmountChange(count - 1);

    const classTag = count ? "item active" : "item";
    return (
        <div className={classTag}>
            <div className="values">
                <div>
                    {formatIt(itemValue, currency, true)}
                </div>
                <div className="sums">
                    {formatIt(sum, currency)}
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
                    value={count > 0 ? count : undefined}
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