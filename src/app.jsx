import { useState } from 'preact/hooks'
import currencies from './currencies';
import MoneyBox from './components/MoneyBox';
import ControlPanel from './components/ControlPanel';

export function App() {
  const [total, setTotal] = useState(0);
  const [currencyData, setCurrencyData] = useState(currencies["huf"]);

  const [amounts, setAmounts] = useState({
    500: { quantity: 0, value: 0 },
    1000: { quantity: 0, value: 0 },
    2000: { quantity: 0, value: 0 },
    5000: { quantity: 0, value: 0 },
    10000: { quantity: 0, value: 0 },
    20000: { quantity: 0, value: 0 },
  });

  return (
    <>
      <main>
        <h1>Cash Counter</h1>
        <MoneyBox setTotal={setTotal} currencyData={currencyData} type="cash" amounts={amounts} setAmounts={setAmounts} />
      </main>
      <ControlPanel currencyData={currencyData} total={total} />
    </>
  )
}