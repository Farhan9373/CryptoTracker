import express from "express";
import { getCryptoStats, getCryptoDeviation } from "../controllers/cryptoController.js";

const router = express.Router();

//for fetching stats
router.get("/stats", getCryptoStats);

//for fetching devaition
router.get("/deviation", getCryptoDeviation);

export default router;
