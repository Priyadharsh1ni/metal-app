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


// The base path for the function is '/api/'.
// We mount the routers directly to this base path.
// For example, a request to '/api/auth/login' will now correctly
// be handled by the authRoutes.
const router = express.Router();
router.use('/auth', authRoutes);
router.use('/purities', purityRoutes);
router.use('/metal-rates', metalRateRoutes);
router.get('/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

// Mount the router to the root of the serverless function
app.use('/.netlify/functions/api', router);

// Export the handler for Netlify
module.exports.handler = serverless(app);
