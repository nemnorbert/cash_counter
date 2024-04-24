import { useState } from 'preact/hooks'
import currencies from './currencies';
import Box from './components/Box';
import Panel from './components/Panel';
import Saves from './components/Saves';

export function App() {
  const totalDefault = { coin: 0, banknote: 0, };
  const [total, setTotal] = useState(totalDefault);
  const [price, setPrice] = useState("");
  const [currency, setCurrencyData] = useState({
    current: currencies["huf"],
    all: currencies
  });

  const resetAll = () => {
    setTotal(totalDefault);
    setPrice("");
  }

  const updateOverall = (type, value) => {
    setTotal(t => ({
      ...t,
      [type]: value
    }))
  }

  return (
    <>
      <main>
        <h1>Cash Counter</h1>
        <Box 
          type="coin" 
          currency={currency.current}
          total={total}
          updateOverall={updateOverall}
        />
        <Box 
          type="banknote" 
          currency={currency.current}
          total={total}
          updateOverall={updateOverall}
        />
        <Saves />
      </main>
      <nav>
        <Panel 
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