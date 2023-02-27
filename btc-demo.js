// import the axios library to make HTTP requests
const axios = require("axios");

// define the Binance API endpoint
const endpoint = "https://api.binance.com/api/v3";

// define the symbol to retrieve data for
const symbol = "BTCUSDT";

// define the timeframe for the query (1 hour)
const interval = "1h";

// define the API endpoint to retrieve the Kline data for the given symbol and timeframe
const klineEndpoint = `${endpoint}/klines?symbol=${symbol}&interval=${interval}`;

// define the API endpoint to retrieve the trade data for the given symbol
const tradesEndpoint = `${endpoint}/aggTrades?symbol=${symbol}`;

// define the threshold for a large order (10 BTC)
const largeOrderThreshold = 10;

// define the time range to retrieve trade data for (past hour)
const startTime = Date.now() - 60 * 60 * 1000;
const endTime = Date.now();

// make an HTTP request to retrieve the Kline data
axios
  .get(klineEndpoint)
  .then((response) => {
    // get the most recent close price from the Kline data
    const closePrice = parseFloat(response.data[response.data.length - 1][4]);

    // make an HTTP request to retrieve the trade data
    return axios.get(tradesEndpoint, {
      params: {
        startTime: startTime,
        endTime: endTime,
      },
    });
  })
  .then((response) => {
    // calculate the inflow rate of large orders
    const trades = response.data;
    let totalLargeOrders = 0;
    let totalVolume = 0;
    for (let i = 0; i < trades.length; i++) {
      const trade = trades[i];
      const price = parseFloat(trade.p);
      const quantity = parseFloat(trade.q);
      const volume = price * quantity;
      if (quantity >= largeOrderThreshold) {
        totalLargeOrders += volume;
      }
      totalVolume += volume;
    }
    const inflowRate = totalLargeOrders / totalVolume;

    // log the inflow rate to the console
    console.log(
      `Inflow rate of large orders in the past hour for ${symbol}: ${inflowRate}`
    );
  })
  .catch((error) => {
    console.log(error);
  });
