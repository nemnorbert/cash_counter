import { useState } from "preact/hooks";
import Item from "./Item";
import formatIt from "../utils/formatIt";

export default function Box({currency, type, updateOverall }) {
    const [total, setTotal] = useState(0);

    const updateTotal = (input) => {
        const newTotal = total + input;
        setTotal(newTotal);
        updateOverall(type, newTotal);
    };

    return (
        <div className="container">
            <div className="title">
                <h2>
                    {type}
                </h2>
                <div className="sums">
                    {formatIt(total, currency)}
                </div>
            </div>
            <div className="content">
                {currency[type].map((item, index) => (
                    <Item 
                        key={item} 
                        currency={currency}
                        itemValue={item}
                        updateTotal={updateTotal}
                    />
                ))}
            </div>
        </div>
    );
}
