import { useState } from 'preact/hooks'
import currencies from './currencies';
import languages from './languages';
import Box from './components/Box';
import Panel from './components/Panel';
import Saves from './components/Saves';
import formatIt from './utils/formatIt';

export function App() {
  // Hooks
  const totalDefault = { coin: 0, banknote: 0, };
  const [total, setTotal] = useState(totalDefault);
  const [price, setPrice] = useState("");
  const [currency, setCurrencyData] = useState({
    current: currencies["huf"],
    all: currencies
  });
  const [translates, setTranslates] = useState({
    current: languages["hu"],
    all: languages
  })
  const savedData = localStorage.getItem('saves');
  const [saves, setSaves] = useState(savedData ? JSON.parse(savedData) : []);

  // Functions
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

  // SAVE
  const saveIt = () => {
    const totalIs = total.banknote + total.coin;
  
    const newSave = {
      time: new Date().toISOString().split('T')[0],
      currency: currency.current.iso,
      total: formatIt(totalIs, currency.current)
    };
  
    setSaves(s => [newSave, ...s]);

    localStorage.setItem('saves', JSON.stringify([newSave, ...saves]));
  };

  const purgeSave = () => {
    localStorage.setItem('saves', '');
    setSaves([]);
  }

  // Render
  return (
    <>
      <main>

        <section id="welcome">
          <h1>Cash Counter</h1>
          <p>by Adanor</p>
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
          purgeSave={purgeSave}
        />

      </main>

      <nav>
        <Panel 
          translate={translates.current.panel}
          currency={currency} 
          setCurrency={setCurrencyData}
          price={price}
          setPrice={setPrice}
          reset={resetAll}
          total={total}
          saveIt={saveIt}
        />
      </nav>
    </>
  )
}