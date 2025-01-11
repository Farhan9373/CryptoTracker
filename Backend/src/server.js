import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import fetchCryptoData from "./jobs/Background.js";
import cryptoRoute from "./routes/cryptoRoute.js"


const app = express();
dotenv.config();
app.use(express.json());

// Routes
app.use("/api", cryptoRoute);

const PORT = process.env.PORT || 5001;

setInterval(async () => {
  console.log("Fetching cryptocurrency data...");
  try {
    await fetchCryptoData();
    console.log("Data fetched successfully.");
  } catch (error) {
    console.error("Error in scheduled task:", error.message);
  }
}, 2 * 60 * 60 * 1000); 



app.listen(PORT, () => {
  console.log("server running on port " + PORT);
  connectDB();
});
