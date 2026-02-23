const express = require('express');
require('dotenv').config();

const mongoose = require('mongoose');
const app = express();

const practiceRoutes = require('./routes/practice.routes');

const userRoutes = require('./routes/user.routes');

const adminRoutes = require('./routes/admin.routes');

app.use(express.json());

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));


app.use('/api/practises', practiceRoutes);

app.use('/api/user', userRoutes);

app.use('/api/admin', adminRoutes);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
