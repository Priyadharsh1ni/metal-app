// netlify/functions/api.js
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

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// --- FIX ---
// The redirect rule in `netlify.toml` handles the `/api/*` part.
// The serverless function receives the rest of the path.
// For example, a request to '/api/auth/login' is passed to the function
// as '/auth/login'. We mount our routers directly to handle these paths.
app.use('/auth', authRoutes);
app.use('/purities', purityRoutes);
app.use('/metal-rates', metalRateRoutes);
app.get('/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

// Export the handler for Netlify
module.exports.handler = serverless(app);
