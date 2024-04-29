import Item from "./Item";

export default function Box({type, translate, currency, total, counter, setCountItems, toMoney }) {

    return (
        <section className={ total ? "active" : undefined }>
            <div className="title">
                <h2>{ translate.title }</h2>
                <div className="sums">{ toMoney(total) }</div>
            </div>
            <div className="content">
                {currency[type].map((item, index) => (
                    <Item 
                        key={item} 
                        counter={counter[item]}
                        item={item}
                        type={type}

                        setCountItems={setCountItems}
                        toMoney={toMoney}
                    />
                ))}
            </div>
        </section>
    );
}