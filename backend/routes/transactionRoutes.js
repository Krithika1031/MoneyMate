import express from "express";

import {
  addTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// Add Transaction
router.post(
  "/add",
  addTransaction
);

// Get User Transactions
router.get(
  "/:user",
  getTransactions
);

export default router;