import qrcode from "../assets/qrcode.webp"

export default function PrintPaper({ currency, price, translate}) {

    const todayDate = new Date().toISOString().split('T')[0];
    const priceDiv = price ? <div><b>{translate.rate}:</b> {price} Ft</div> : undefined;

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
                    <div className="details">
                        <b>{translate.banknote}</b>
                            <div>500&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div><div>1&nbsp;000&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div><div>2&nbsp;000&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div><div>5&nbsp;000&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div><div>10&nbsp;000&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div><div>20&nbsp;000&nbsp;Ft x <b>0</b> 
                        = <b>0&nbsp;Ft</b></div>
                        </div>
                </div>

                <div className="bottom">
                    <div className="total">555</div>
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