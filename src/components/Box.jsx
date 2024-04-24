import Item from "./Item";
import formatIt from "../utils/formatIt";

export default function Box({currency, type, total, updateOverall }) {

    const updateTotal = (input) => {
        const newTotal = total[type] + input;
        updateOverall(type, newTotal);
    };

    return (
        <div className="container">
            <div className="title">
                <h2>
                    {type}
                </h2>
                <div className="sums">
                    {formatIt(total[type], currency)}
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
