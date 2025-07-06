const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path');
require('dotenv').config();

// Use path.resolve to create absolute paths to your router files
const purityRoutes = require(path.resolve(__dirname, '../../server/router/purityRoutes.js'));
const metalRateRoutes = require(path.resolve(__dirname, '../../server/router/metalRate.js'));
const authRoutes = require(path.resolve(__dirname, '../../server/router/auth.js'));

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.error("MongoDB connection error:", err));

// The redirect rule in netlify.toml handles stripping /api
// So a request to /api/auth/login comes in as /auth/login.
app.use('/auth', authRoutes);
app.use('/purities', purityRoutes);
app.use('/metal-rates', metalRateRoutes);
app.get('/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

// Export the serverless-wrapped app
module.exports.handler = serverless(app);
