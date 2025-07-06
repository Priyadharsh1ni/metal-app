const express = require('express');
const router = express.Router();
const MetalRate = require('../modals/metalRate');
const authMiddleware = require('../middlewere/auth'); // [cite: 26]


router.get('/', authMiddleware, async (req, res) => {
    try {
        const latestRate = await MetalRate.find()
        res.json(latestRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create New Rate [cite: 17]
router.post('/', authMiddleware, async (req, res) => {
    const { metal, rate, rateDate, description } = req.body;
    try {
        const latestRate = await MetalRate.findOne({ metal })
        if (latestRate) {
            const difference = (rate - latestRate.rate) / latestRate.rate;
            const newRate = new MetalRate({ ...req.body, change: Number((difference * 100).toFixed(2)) });
            await newRate.save();
            res.status(201).json(newRate);
        } else {
            const newRate = new MetalRate({ ...req.body, change: 0 });
            await newRate.save();
            res.status(201).json(newRate);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get Rate History with optional filtering and pagination [cite: 18, 20, 21]
router.get('/history', authMiddleware, async (req, res) => {
    const { metal, purityId, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (metal) filter.metal = metal;
    if (purityId) filter.purityId = purityId;

    try {
        const rates = await MetalRate.find(filter)
            .sort({ rateDate: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await MetalRate.countDocuments(filter);
        res.json({
            rates,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;