import qrcode from "../assets/qrcode.webp"

export default function PrintPaper({ total, currency, price, translate, counter, toMoney}) {
    const overall = total.coin + total.banknote;
    const todayDate = new Date().toISOString().split('T')[0];
    const priceDiv = price ? <div><b>{translate.rate}:</b> {price} Ft</div> : undefined;

    const subTotal = () => {
        if (!price || currency.iso === "huf") { return ""}
        const total = Math.ceil( overall * price );
        return total.toLocaleString("hu-HU", { style: 'currency', currency: "huf", maximumFractionDigits: 0 })
    }

    function DetailsBox ({ type, counter }) {    
        return (
            <div className="details">
                <b>{translate[type]}</b>

                <div className="content">
                    {Object.keys(counter).map(key => {
                        if (counter[key].count && counter[key].count) {
                            return (
                                <div key={key}>
                                    {key} x {counter[key].count} = <b>{toMoney(counter[key].total)}</b>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>

                <div className="sub">
                    { toMoney(total[type]) }
                </div>
            </div>
        )
    }

    function Page ({ page }) {
        return (
            <div className="page">

                <div className="title">
                    <div className="left">
                        <h2>Cash Counter</h2>
                        <b>work.adanor.eu / counter</b>
                        <p>{ translate.page } { page }</p>
                    </div>
                    <img src={ qrcode } alt="qr code" />
                </div>

                <div className="main">
                    <div className="info">
                        <div> <b>{translate.date}:</b> { todayDate }</div>
                        <div> <b>{translate.currency}:</b> { currency.iso }</div>
                        { priceDiv }
                    </div>
                    {
                        total["coin"] ? <DetailsBox 
                            type="coin"
                            counter={counter["coin"]}
                        /> : null 
                    }
                    {
                        total["banknote"] ? <DetailsBox 
                            type="banknote"
                            counter={counter["banknote"]}
                        /> : null
                    }
                </div>

                <div className="bottom">
                    <div className="total">
                        <b>{ toMoney(overall) }</b>
                        <div>{ subTotal() }</div>
                    </div>
                    <div className="signature">{ translate.signature }: .............................</div>
                </div>
            </div>                
        )
    }

    return (
        <div id="print">
            <Page page="1"/>
            <Page page="2"/>
        </div>
    )
}