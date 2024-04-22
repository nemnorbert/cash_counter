export default function ControlPanel({ currencyData, total }) {
    function Switcher() {
        return (<>
            <div className="switch">
                <label htmlFor="switcher">Valuta:</label>
                <select name="switcher" id="switcher">
                    <option value="HUF">HUF</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
            </div>
        </>)
    }

    function Button({ children }) {
        return (<>
            <button>{children}</button>
        </>)
    }

    return (<>
        <nav>
            <div id="total">
                <div className="title">
                    <div>grand total</div>
                    <Switcher />
                </div>
                <div className="value">
                    <div>{total}</div>
                    <div>-</div>
                </div>
            </div>
            <div className="buttons">
                <Button>Save</Button>
                <Button>Print</Button>
                <Button>Reset</Button>
            </div>
        </nav>
    </>)
}