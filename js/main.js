// CashCounter Project by Norbert Nemeth
// The comments are intentionally left in the code
console.log('%cCashCounter by REDCAT', 'color: white; background-color: green; padding: 2px 5px; border-radius: 2px');

// Objects
const mainData = {
    today: new Date().toISOString().split('T')[0],
    currency: "HUF",
    lang: "hu",
    price: "-",
    total: 0,
    total2: "-",
    checked: false,
    saves: []
}
const currencyObject = {
    HUF: {
        name: "HUF",
        lang: "hu",
        cash: [500, 1000, 2000, 5000, 10000, 20000]
    },
    EUR: {
        name: "EUR",
        lang: "de-DE",
        cash: [5, 10, 20, 50, 100, 200, 500]
    },
    USD: {
        name: "USD",
        lang: "en-US",
        cash: [1, 2, 5, 10, 20, 50, 100]
    }
};
const sumCash = {
    count: [],
    total: []
};

// Variables
let currencyAPI; // for API Currency Data
let currencyData;
let priceData = 0;

// Divs
const selectDiv = document.getElementById("currency");
const cashDiv = document.getElementById("calcBox");
const saveDiv = document.getElementById("saveBtn");
const sumSpan = document.getElementById("sum1");
const sum2 = document.getElementById("sum2");
const saveContent = document.getElementById("saveContent");
const title = document.getElementById("title");
const priceDiv = document.getElementById("price");
const coverDiv = document.getElementById("cover");
const calcDivs = document.querySelectorAll('.box');

// Functions
const fetchJSON = (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        throw error;
      });
}

const convertString = (value, lang = currencyData.lang, curr = currencyData.name) => {
    return value.toLocaleString(lang, {style: 'currency', currency: curr, minimumFractionDigits: 0, maximumFractionDigits: 0});
}

const inStepper = (input, increment) => {
    let inputID = document.getElementById(input);
    let value = parseInt(inputID.value);

    if (isNaN(value)) {value = 0;}
    if (increment) {
        inputID.value = value + 1;
    } else {
        inputID.value = value > 0 ? value - 1 : 0;
    }

    const event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    inputID.dispatchEvent(event);
}

// Save Managers
const saveIt = () => {
    mainData.saves = JSON.parse(localStorage.getItem("cashcounter_save")) || [];

    let save = {
        date: mainData.today,
        total: mainData.total,
        total2: mainData.total2
    };

    mainData.saves.push(save);
    if (mainData.saves.length > 10) {
        mainData.saves = mainData.saves.slice(-10);
    }
    localStorage.setItem("cashcounter_save", JSON.stringify(mainData.saves));
    saveManager();
}
const purgeSaves = () => {
    localStorage.removeItem("cashcounter_save");
    window.location.reload();
}
const saveManager = () => {
    if (mainData.saves.length == 0) return;
    
    let saveTable = document.getElementById("saveTable");
    let saveHTML =  `<tr>
            <th>Date</th>
            <th>Total</th>
            <th>HUF</th>
        </tr>`;
    saveContent.style.display = "flex"

    mainData.saves.forEach((save, index) => {
        saveHTML += `<tr>
            <td>${save.date}</td>
            <td>${save.total}</td>
            <td>${save.total2}</td>
        </tr>`
    });
    saveTable.innerHTML = saveHTML;
}

const foreignCurrency = async () => {
    let storageData = JSON.parse(localStorage.getItem("cashcounter_currency")) || {};
    let fresh = mainData.today === (storageData?.date ?? false);
    if (!fresh) {
        try {
            currencyAPI = await fetchJSON("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5QIBazzZLkZ1bRnNGyveyxK0z1TjfssJihF9EiLJ&currencies=USD%2CHUF&base_currency=EUR");
            console.log('%cCurrencies updated (api ready)', 'color: white; background-color: blue; padding: 2px 5px; border-radius: 2px');
            let json = {
                date: mainData.today,
                EUR: Math.floor(currencyAPI.data.HUF),
                USD: Math.floor(currencyAPI.data.HUF/currencyAPI.data.USD)
            }
            localStorage.setItem("cashcounter_currency", JSON.stringify(json));
            storageData = json;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    priceDiv.innerHTML = `<b>${storageData[mainData.currency]} HUF</b><br>${storageData.date}`;
    priceData = storageData[mainData.currency];
    mainData.price = convertString(priceData,"hu-HU", "HUF");
}




/////////////////////////



const calcSystem = () => {
    let cashCalc = document.querySelectorAll('.inputs');
    cashCalc.forEach((input, index) => {
        input.addEventListener("input", function () {
            let maki = input.getAttribute("data-value") * this.value
            sumCash.count[index] = this.value;
            sumCash.total[index] = maki;
            let sum = sumCash.total.reduce((total, current) => {
                return total + current;
            }, 0);
            let total1 = convertString(sum);
            sumSpan.innerHTML = total1;
            title.innerHTML = total1;
            mainData.total = total1;
            if (mainData.currency !== "HUF") {
                let total2 = convertString(sum * priceData,"hu-HU", "HUF");
                sum2.innerHTML = total2;
                mainData.total2 = total2;
            }
        })
    })
}
const selectCurrency = (money = "HUF") => {
    mainData.today = new Date().toISOString().split('T')[0];
    mainData.currency = money.toUpperCase();
    cashDiv.innerHTML = buildHTML();
    calcSystem();
    coverDiv.style.backgroundImage = `linear-gradient(45deg, #161616eb, #292929b8), url("./img/${mainData.currency}.webp")`;
    calcDivs.forEach(calc => {
        calc.style.display = 'flex';
        const resetDiv = document.getElementById("resetBtn");
        resetDiv.addEventListener("click", function() {location.reload();});
    });

    title.innerHTML = "Cash Counter";
    mainData.total = convertString(0);
    sumSpan.innerHTML = convertString(0);

    if (money !== "HUF") {
        foreignCurrency();
    } else {
        priceDiv.innerHTML = sum2.innerHTML = "";
        mainData.price = mainData.total2 = "-";
    }

    mainData.saves = JSON.parse(localStorage.getItem("cashcounter_save")) || [];
    
    saveManager();
}

// Builders
const buildHTML = (type = "cash") => {
    currencyData = currencyObject[mainData.currency];
    let i = 0;
    sumCash.total.length = 0;
    let label = currencyData[type].map(element => {
        sumCash.total[i] = sumCash.count[i] = 0;
        i++;
        return `<label><div class="title">${convertString(element)}</div>
                    <div class="inputStepper">
                        <div class="step btn" onclick="inStepper('input-${i}', false)">-</div>
                        <input id="input-${i}" class="inputs" placeholder="0" type="number" min="0" data-value="${element}">
                        <div class="step btn" onclick="inStepper('input-${i}', true)">+</div>
                    </div>
                </label>`
    }).join("");
    return `<form id="${type+"Form"}">${label}</form>`;
}

const buildPrint = () => {
    let printDIV = document.getElementById("print");

    const details = () => {
        return currencyData.cash.map((element, index) => {
            return `<div>${convertString(element)} x <b>${sumCash.count[index]}</b> 
            = <b>${convertString(sumCash.total[index])}</b></div>`
        }).join("");
    }

    let total2 = mainData.total2 == "" ? "" : "("+mainData.total2+")";

    printDIV.innerHTML = "";
    for (let i = 0; i < 2; i++) {
        printDIV.innerHTML += `<div class="page">
        <div class="title">
            <div class="left">
                <h2>Cash Counter</h2>
                <b>r.red-cat.hu / counter</b>
            </div>
            <div>Page ${i+1}</div>
        </div>
        <div class="main">
            <div class="info">
                <div>
                    <b>Date:</b> <span>${mainData.today}</span>
                </div>
                <div>
                    <b>Currency:</b> <span>${mainData.currency}</span>
                </div>
                <div>
                    <b>Exchange rate:</b> <span>${mainData.price}</span>
                </div>
                <div>
                    <b>Comments:</b>
                    .................................................................<br>
                    ................................................................................................<br>
                </div>
            </div>
            <div class="details">
                <b>Details:</b>
                ${details()}
            </div>
        </div>
        <div>
            <div class="total">
                <div><b>Total:</b></div>
                <div><b>${mainData.total}</b> ${total2}</div>
            </div>
            <div class="sign">Signature: ...................................</div>
        </div>
        </div>`;
    }
    window.print();
}

// add Event Listener
const switchers = document.querySelectorAll('.switch');
switchers.forEach(switcher => {
    switcher.addEventListener("click", function () {
        switchers.forEach(s => s.classList.remove('active'));
        selectCurrency(this.getAttribute('alt'));
        switcher.classList.add('active');
    });
});

saveDiv.addEventListener("click", saveIt);
selectCurrency();