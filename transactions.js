const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        description: req.body.description,
        amount: req.body.amount,
        type: req.body.type,
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;