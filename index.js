const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors')

const path = require('path')
const app = express();

const port = process.env.port || 4000;

dotenv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.error('MongoDB connection error:', error));

app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);
app.use('/firm',firmRoutes)
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to SUBY</h1>");
});

app.listen(port, () => {
    console.log(`Server started and running at port ${port}`);
});
