import { useState, useEffect } from "preact/hooks";
export default function MoneyBox({currencyData, type, amounts, setAmounts}) {
    const [boxTotal, setBoxTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        for (const key in amounts) {
            total += amounts[key].value;
        }
        setBoxTotal(total);
    }, [amounts]);

    // Cash Item
    function CashItem({ children, amounts, setAmounts }) {
        const itemCount = amounts?.[children]?.quantity;
        const itemValue = amounts?.[children]?.value;

        const handleAmountChange = (newAmount) => {
            const quantity = newAmount > 999 ? 999 : Math.max(0, newAmount);
            const totalValue = children * quantity;

            setAmounts(prevAmounts => ({
                ...prevAmounts,
                [children]: {
                    ...prevAmounts[children],
                    quantity,
                    value: totalValue
                },
            }));
        };
        
        const handleChange = (e) => handleAmountChange(Number(e.target.children));
        const handleIncrement = () => handleAmountChange(itemCount + 1);
        const handleDecrement = () => handleAmountChange(itemCount - 1);
        
        return (<>
            <div className="item">
                <div className="value">{children}</div>
                <div>{itemValue}</div>
                <div className="btn">
                    <button onClick={handleDecrement} disabled={itemCount === 0 || undefined} className={itemCount === 0 ? "disabled" : undefined}> - </button>
                    <input onChange={handleChange} 
                        type="number" 
                        name="address"  
                        min="0" 
                        max="999" 
                        value={itemCount}
                    />
                    <button onClick={handleIncrement}> + </button>
                </div>
            </div>
        </>)
    }

        
    return (<>
        <div className="container">
            <h2>Papír</h2>
            {
                currencyData?.[type]?.map((item, index) => (
                    <CashItem key={index} amounts={amounts} setAmounts={setAmounts}>
                        {item}
                    </CashItem>
                ))
            }
            <p>Összesítve: {boxTotal}</p>
        </div>
    </>)
}