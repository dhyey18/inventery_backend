import express from "express";

const router = express.Router();
import {
  processRental,
  processPurchase,
} from "../controllers/transaction.controller.js";

router.post("/rental", processRental);
router.post("/purchase", processPurchase);

export default router;
