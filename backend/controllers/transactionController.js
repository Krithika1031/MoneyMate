import Transaction from "../models/Transaction.js";

// ================= ADD TRANSACTION =================

export const addTransaction = async (req, res) => {

  try {

    const {
      user,
      type,
      source,
      amount,
    } = req.body;

    const transaction =
      await Transaction.create({
        user,
        type,
        source,
        amount,
      });

    res.status(201).json({
      success: true,
      message: "Transaction Added",
      transaction,
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ================= GET USER TRANSACTIONS =================

export const getTransactions = async (
  req,
  res
) => {

  try {

    const { user } = req.params;

    const transactions =
      await Transaction.find({
        user,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      transactions,
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};