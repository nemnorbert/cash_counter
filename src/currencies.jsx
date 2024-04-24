const currencies = {
    huf: {
        iso: "huf",
        lang: "hu-HU",
        banknote: [500, 1000, 2000, 5000, 10000, 20000],
        coin: [5, 10, 20, 50, 100, 200],
    },
    eur: {
        iso: "eur",
        lang: "de-DE",
        banknote: [5, 10, 20, 50, 100, 200, 500],
        coin: [0.01, 0.02, 0.05, 0.10, 0.20, 0.50, 1, 2],
        subSymbol: "¢",
        subUnit: 100,
    },
    usd: {
        iso: "usd",
        lang: "en-US",
        banknote: [1, 5, 10, 20, 50, 100],
        coin: [0.01, 0.05, 0.10, 0.25, 0.50],
        subSymbol: "¢",
        subUnit: 100,
    }
};

export default currencies;