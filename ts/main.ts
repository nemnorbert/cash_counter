console.log('%cCashCounter by REDCAT', 'color: white; background-color: green; padding: 2px 5px; border-radius: 2px');

const currencyData = {
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
}

// Functions
const fetchJSON = (url) => {
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
        throw err;
    });
}