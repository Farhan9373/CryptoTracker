import Crypto from "../models/crypto.js";

// Controller for fetching the latest stats
export const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Query param 'coin' is required" });
  }

  try {
    const latestRecord = await Crypto.findOne({ coin }).sort({ createdAt: -1 });

    if (!latestRecord) {
      return res.status(404).json({ error: "No data found for the specified coin" });
    }

    const response = {
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      "24hChange": latestRecord.change24h,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stats", details: error.message });
  }
};

// Controller for calculating the standard deviation
export const getCryptoDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Query param 'coin' is required" });
  }

  try {
    const last100Records = await Crypto.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100);

    if (last100Records.length === 0) {
      return res.status(404).json({ error: "No data found for the specified coin" });
    }

    const prices = last100Records.map((record) => record.price);

    // Calculating the mean 
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

    // Calculating the standard deviation
    const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / prices.length;
    const stdDev = Math.sqrt(variance);

    res.json({ deviation: stdDev.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Error calculating deviation", details: error.message });
  }
};
