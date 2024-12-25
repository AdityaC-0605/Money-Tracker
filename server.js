const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(`process.env.mongodb+srv://${username}:${password}@cluster0.iifz2ri.mongodb.net/moneytrackDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.static('public'));
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});