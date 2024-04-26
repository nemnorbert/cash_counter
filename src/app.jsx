import { useState } from 'preact/hooks'
import currencies from './currencies';
import languages from './languages';
import Box from './components/Box';
import Panel from './components/Panel';
import Saves from './components/Saves';

export function App() {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const now = new Date().toLocaleString('hu-HU', options);

  // Hooks
  const totalDefault = { coin: 0, banknote: 0, };
  const [total, setTotal] = useState(totalDefault);
  const [price, setPrice] = useState("");
  const [saves, setSaves] = useState([
    {time: now, total: 5000, price: price},
    {time: "2024. 04. 23. 15:30:45", total: total.coin, price: price}
  ]);
  const [currency, setCurrencyData] = useState({
    current: currencies["huf"],
    all: currencies
  });
  const [translates, setTranslates] = useState({
    current: languages["hu"],
    all: languages
  })

  // Functions
  const resetAll = () => {
    setTotal(totalDefault);
    setSaves([Dare]);
    setPrice("");
  }

  const updateOverall = (type, value) => {
    setTotal(t => ({
      ...t,
      [type]: value
    }))
  }

  // Render
  return (
    <>
      <main>

        <section>
          <h1>Cash Counter</h1>
        </section>

        <Box 
          type="coin" 
          translate={translates.current.coin}
          currency={currency.current}
          total={total}
          updateOverall={updateOverall}
        />

        <Box 
          type="banknote"
          translate={translates.current.banknote}
          currency={currency.current}
          total={total}
          updateOverall={updateOverall}
        />

        <Saves 
          translate={translates.current.save}
          saves={saves}
        />

      </main>

      <footer>
        <div>Powered by</div>
        <div>Adanor</div>
      </footer>

      <nav>
        <Panel 
          translate={translates.current.panel}
          currency={currency} 
          setCurrency={setCurrencyData}
          price={price}
          setPrice={setPrice}
          reset={resetAll}
          total={total}
        />
      </nav>
    </>
  )
}