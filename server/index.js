const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();

const purityRoutes = require('./router/purityRoutes');
const metalRateRoutes = require('./router/metalRate');
const authRoutes = require('./router/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use('/auth', authRoutes);
app.use('/purities', purityRoutes);
app.use('/metal-rates', metalRateRoutes);

// Static Metals Route
app.get('/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

// Export the handler for Netlify
module.exports.handler = serverless(app);
