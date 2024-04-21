export default function ControlPanel({total}) {
    return (<>
        <div id='total'>
            <div className="title">
                total
            </div>
            <div className="value">{total}</div>
            <div className="huf">-</div>
        </div>
    </>)
}