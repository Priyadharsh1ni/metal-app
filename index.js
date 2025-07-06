const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const purityRoutes = require('./router/purityRoutes');
const metalRateRoutes = require('./router/metalRate');
const authRoutes = require('./router/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// FIX: Use the MONGO_URI from environment variables
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/purities', purityRoutes);
app.use('/api/metal-rates', metalRateRoutes);

// Static Metals Route
app.get('/api/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
