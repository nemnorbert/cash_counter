import { useState } from 'preact/hooks'
import currencies from './currencies';
import languages from './languages';
import Box from './components/Box';
import Panel from './components/Panel';
import Saves from './components/Saves';
import PrintPaper from './components/PrintPaper';
import logo from './assets/logo.svg'

const typesDefault = { coin: 0, banknote: 0 };

export function App() {
  // Price
  const [price, setPrice] = useState("");

  // Currency
  const [currency, setCurrency] = useState(currencies["huf"]);

  // Counter
  const setCounterBase = (currency) => {
    const categories = ["coin", "banknote"];
    const base = {};
    categories.forEach(category => {
      base[category] = {};
      const items = currency[category];
      items.forEach(item => {
        base[category][item] = { count: 0, total: 0 };
      });
    });
    return base;
  };
  const [ counter, setCounter ] = useState(() => setCounterBase(currency));
  const [ total, setTotal ] = useState(typesDefault);

  // Languages
  const [translates, setTranslates] = useState(languages["hu"]);

  // Saves
  const savedData = localStorage.getItem('saves');
  const [saves, setSaves] = useState(savedData ? JSON.parse(savedData) : []);

  // Print Paper
  const [print, setPrint] = useState(true);

  //////////// Functions ////////////
    const setCountItems = (type, item, count, total) => {
      setCounter(c => {
        const updatedCounter = {
          ...c,
          [type]: {
            ...c[type],
            [item]: { count, total }
          }
        };
    
        const newTotal = Object.values(updatedCounter[type]).reduce((all, current) => all + current.total, 0);
        setTotal(prevTotal => ({
          ...prevTotal,
          [type]: newTotal
        }));
    
        return updatedCounter;
      });
    };

    const resetAll = () => {
      setCounter(() => setCounterBase(currency));
      setTotal(typesDefault);
      setPrice("");
    }

    const handlerChangeCurrency = (e) => {
      const newCurrency = currencies[e.target.value];
      if (!newCurrency) return;
    
      setCurrency(newCurrency);
      setCounter(setCounterBase(newCurrency));
      setTotal(typesDefault);
      setPrice("");
    };

    const handlerChangeLang = (e) => {
      const newLang = languages[e.target.value];
      if (!newLang) return;

      setTranslates(newLang);
    };  
    
    const toMoney = (input, sub = false) => {
      if (!input) return "";
      const maxDigits = Number.isInteger(input) ? 0 : 2;
      const {subSymbol, subUnit} = currency;

      if (input < 1 && sub && subSymbol && subUnit) {
        return `${input * subUnit} ${subSymbol}`;
      }

      return input.toLocaleString(
        currency.lang, 
          { style: 'currency', currency: currency.iso, maximumFractionDigits: maxDigits }
      )
    }
    
    const saveIt = () => {
      const newSave = {
        time: new Date().toISOString().split('T')[0],
        currency: currency.iso,
        total: toMoney(total.banknote + total.coin)
      };
      setSaves(s => [newSave, ...s]);
      localStorage.setItem('saves', JSON.stringify([newSave, ...saves]));
    };
    
    const deleteSaves = () => {
      localStorage.setItem('saves', '');
      setSaves([]);
    }

  // Render
  return (
    <>
      <main>

        <section id="welcome">
          <h1>Cash<br/>Counter</h1>
          <a href='https://adanor.eu' target='_blank'>
            by <img src={logo} alt="Logo" />
          </a>
        </section>

        <Box 
          type="coin" 
          counter={counter.coin}
          translate={translates.coin}
          currency={currency}
          total={total.coin}

          toMoney={toMoney}
          setCountItems={setCountItems}
        />

        <Box 
          type="banknote"
          counter={counter.banknote}
          translate={translates.banknote}
          currency={currency}
          total={total.banknote}

          toMoney={toMoney}
          setCountItems={setCountItems}
        />

        <Saves 
          translate={translates.save}
          saves={saves}
          deleteAll={deleteSaves}
        />

      </main>

      <nav>
        <Panel 
          translate={translates.panel}
          currency={currency}
          currencies={currencies}
          price={price}
          total={total}
          languages={languages}

          onChangeLang={handlerChangeLang}
          onChangeCurrency={handlerChangeCurrency}
          toMoney={toMoney}
          setPrice={setPrice}
          reset={resetAll}
          saveIt={saveIt}
        />
      </nav>

      {
        print ? <PrintPaper
          currency={currency} 
          price={price}
          translate={translates.print}
        /> : undefined
      }
    </>
  )
}