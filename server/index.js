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

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/metal-rate-db';

mongoose.connect(mongoURI)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/purities', purityRoutes);
app.use('/api/metal-rates', metalRateRoutes);

// Static Metals Route
app.get('/api/metals', (req, res) => {
    const metals = ['Gold', 'Silver', 'Platinum'];
    res.json(metals);
});

