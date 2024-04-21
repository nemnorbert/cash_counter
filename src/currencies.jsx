const currencies = {
    huf: {
        currency: "HUF",
        lang: "hu-HU",
        name: "forint",
        cash: [500, 1000, 2000, 5000, 10000, 20000],
        coin: {
            coins: [5, 10, 20, 50, 100, 200],
        }
    },
    usd: {
        currency: "USD",
        lang: "en-US",
        cash: [1, 2, 5, 10, 20, 50, 100],
        coin: {
            name: "cent",
            coins: [1, 5, 10, 25],
            multiplier: 0.01
        }
    },
    eur: {
        currency: "EUR",
        lang: "de-DE",
        cash: [5, 10, 20, 50, 100, 200],
    },
}
export default currencies;