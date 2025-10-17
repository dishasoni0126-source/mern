// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---------- MONGODB CONNECTION (using the connection string you provided) ----------
const mongoURI = "mongodb+srv://disha:disha@cluster0.wjvnass.mongodb.net/mern_auth?retryWrites=true&w=majority&appName=Cluster0";
// Note: I added the database name `mern_auth` right after the host part.
// You requested no .env usage, so this string is in the file (not recommended for production).

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// ---------- ROUTES ----------
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('MERN Auth Server is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
