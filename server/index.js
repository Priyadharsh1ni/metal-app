// netlify/functions/api.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const path = require('path'); // Import the path module
require('dotenv').config();

// Use path.resolve to create absolute paths to your router files
const purityRoutes = require(path.resolve(__dirname, '../../server/router/purityRoutes'));
const metalRateRoutes = require(path.resolve(__dirname, '../../server/router/metalRate'));
const authRoutes = require(path.resolve(__dirname, '../../server/router/auth'));

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define routes on the router instance
router.use('/auth', authRoutes);
router.use('/purities', purityRoutes);
router.use('/metal-rates', metalRateRoutes);

router.get('/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

// Mount the router under the /api path
app.use('/api', router);

// Export the handler for Netlify
module.exports.handler = serverless(app);
