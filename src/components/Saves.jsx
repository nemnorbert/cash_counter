export default function Saves({ translate, saves, purgeSave }) {
    return (<>
        <section className="saves">
            <div className="title">
                <h2>{ translate?.title ?? "Saved" } ({saves.length})</h2>
            </div>
            <div className="content">
                <div className="table-header">
                    <div>{ translate?.table?.date ?? "Date" }</div>
                    <div>{ translate?.table?.currency ?? "Currency" }</div>
                    <div>{ translate?.table?.value ?? "Value" }</div>
                </div>
                <div className="table-content">
                    {saves.map((save, index) => (
                        <div className="row" key={index}>
                            <div>{save.time}</div>
                            <div>{save.currency.toUpperCase()}</div>
                            <div>{save.total}</div>
                        </div>
                    ))}
                </div>
                <button onClick={purgeSave}>{ translate?.purge ?? "Delete all data"}</button>
            </div>
        </section>
    </>);
}