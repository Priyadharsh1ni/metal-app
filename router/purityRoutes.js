const express = require('express');
const router = express.Router();
const Purity = require('../modals/purity');
const authMiddleware = require('../middlewere/auth'); // [cite: 26]

// Create Purity 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newPurity = new Purity(req.body);
        await newPurity.save();
        res.status(201).json(newPurity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read All Purities 
router.get('/', authMiddleware, async (req, res) => {
    try {
        const purities = await Purity.find();
        res.json(purities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Purity 
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { metal, purity } = req.body.updateData;
        const updatedPurity = await Purity.findByIdAndUpdate(
            req.params.id, 
            { metal, purity }, 
            { new: true }
        );
        res.json(updatedPurity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Purity 
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Purity.findByIdAndDelete(req.params.id);
        res.json({ message: 'Purity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;