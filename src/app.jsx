import { useState } from 'preact/hooks'
import currencies from './currencies'

function CashItem({ onClick, children }) {
  return (<>
    <div>
      <div>{children}</div>
      <div className="btn">
        <button> - </button>
        <input type="number" name="address"  min="0" defaultValue="0" />
        <button> + </button>
      </div>
    </div>
  </>)
}

function CurrencySwitcher() {
  return (<>
    <select id="currency" name="currency">
        <option value="huf">HUF</option>
        <option value="eur">EUR</option>
        <option value="usd">USD</option>
    </select>
  </>)
}

export function App() {
  const [total, setTotal] = useState(0);
  const [details, setDetails] = useState({});
  const [money, setMoney] = useState(currencies["usd"]);

  const convertTo = (input) => input.toLocaleString(money.lang, {style: 'currency', currency: money.currency, maximumFractionDigits: 0});

  function handleCashClick(amount) {
    setTotal(total + amount)
  }

  return (
    <>
      <h1>Cash Counter</h1>
      <main>
        {
          money.cash.map((item, index) => (
            <CashItem key={index} onClick={() => handleCashClick(item)}>
              {convertTo(item)}
            </CashItem>
          ))
        }
      </main>
      <div id='total'>
        <div className="title">
          <CurrencySwitcher /> total
        </div>
        <div className="value">{convertTo(total)}</div>
        <div className="huf">-</div>
      </div>
    </>
  )
}