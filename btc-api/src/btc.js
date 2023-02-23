import { useEffect, useState } from "react";

export default function BTCData() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
      );
      const data = await response.json();
      setData(data);
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">LIVE BTC/USDT</h1>
      <p className="text-2xl font-bold text-gray-600 mb-4">
        current price: {usdFormatter.format(data.lastPrice)}
      </p>
      <p className="text-xl font-medium text-gray-500 mb-4">
        Price change: {Number(data.priceChange).toFixed(2)}%
      </p>
      <p className="text-xl font-medium text-gray-500 mb-4">
        24h volume: {Number(data.volume).toLocaleString()}
      </p>
      <div className="text-sm mt-32">Rashad test ver:1.0</div>
    </div>
  );
}
