import axios from "axios";
import Crypto from "./models/crypto.js"; 
import dotenv from "dotenv";

dotenv.config();

const fetchCryptoData = async () => {
  try {
    // Coins we need
    const coins = ["bitcoin", "ethereum", "matic-network"];
    const API_KEY = process.env.CRYPTO_API_KEY;

    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets";

    // Fetch data for the coins
    const { data } = await axios.get(apiUrl, {
      params: {
        vs_currency: "usd", 
        ids: coins.join(","), 
        x_cg_demo_api_key: API_KEY, // Pass the API key
      },
    });

    
    for (const coin of coins) {
      const coinData = {
        coin,
        price: data.find((c) => c.id === coin).current_price,
        marketCap: data.find((c) => c.id === coin).market_cap,
        change24h: data.find((c) => c.id === coin).price_change_percentage_24h,
      };

      await Crypto.create(coinData);
      console.log(`Data for ${coin} saved:`, coinData);
    }
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error.message);
  }
};

export default fetchCryptoData;
